"use client";

import { useState, useEffect } from "react";
import styles from "./shop.module.scss";

type Shop = {
  id: string;
  name: string;
  category: "飲食" | "体験・買い物";
  image_url: string;
  open_time: string;
  close_time: string;
  closed_on: string;
  tel: string;
  address: string;
  rating?: number;
};

export default function Shop() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const canvas = document.getElementById("search-wave") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 1000;
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawFullWave = (amplitude: number, freq: number, color: string, speedShift: number, baseHeight: number) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x++) {
          // Subtle oscillation across the whole height area
          const y = (canvas.height * baseHeight) + Math.sin(x * freq + time * speedShift) * amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = color;
        ctx.fill();
      };

      // Use colors that harmonize with #FDF4EC (Peach) rather than strong blues
      // Light sea foam white and very pale blue, with extra low opacity
      drawFullWave(40, 0.0012, "rgba(255, 255, 255, 0.25)", 0.6, 0.5);
      drawFullWave(30, 0.0008, "rgba(174, 226, 245, 0.08)", 0.4, 0.7);
      drawFullWave(50, 0.0015, "rgba(253, 226, 204, 0.1)", 0.3, 0.3); 

      time += 0.012;
      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const itemsPerPage = 6;

  const fetchShops = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/google-places`);
      const data = await res.json();
      if (data.success) {
        setShops(data.data);
        setFilteredShops(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch shops:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = shops;
    if (selectedCategory) {
      result = result.filter(shop => shop.category === selectedCategory);
    }
    if (searchKeyword) {
      result = result.filter(shop =>
        shop.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    setFilteredShops(result);
    setCurrentPage(1);
  }, [selectedCategory, shops]);

  const handleSearch = () => {
    let result = shops;
    if (selectedCategory) {
      result = result.filter(shop => shop.category === selectedCategory);
    }
    if (searchKeyword) {
      result = result.filter(shop =>
        shop.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    setFilteredShops(result);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setSelectedShop(null);
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.shopContainer}>
      <canvas id="search-wave" className={styles.searchWaveBackground}></canvas>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>現在営業中店舗</h2>
      </div>

      {/* Search Input */}
      <div className={styles.searchSection}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="キーワード検索..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          検索
        </button>
      </div>

      {/* Filter and Pagination Header */}
      <div className={styles.filterHeader}>
        <div className={styles.categoryButtons}>
          <button
            className={`${styles.categoryBtn} ${selectedCategory === "" ? styles.active : ""}`}
            onClick={() => setSelectedCategory("")}
          >
            全て
          </button>
          <button
            className={`${styles.categoryBtn} ${selectedCategory === "飲食" ? styles.active : ""}`}
            onClick={() => setSelectedCategory("飲食")}
          >
            飲食
          </button>
          <button
            className={`${styles.categoryBtn} ${selectedCategory === "体験・買い物" ? styles.active : ""}`}
            onClick={() => setSelectedCategory("体験・買い物")}
          >
            体験
          </button>
        </div>

        <div className={styles.paginationTop}>
          {currentPage > 1 && (
            <button
              className={styles.prevBtn}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              前へ
            </button>
          )}
          <div className={styles.pageNumbers}>
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i + 1}
                className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.active : ""}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </span>
            ))}
            {totalPages > 0 && <span className={styles.separator}>|</span>}
          </div>
          <button
            className={styles.nextBtn}
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            次へ
          </button>
        </div>
      </div>

      {/* Shop Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>読み込み中...</div>
      ) : (
        <div className={styles.shopGrid}>
          {currentShops.map((shop) => (
            <div
              key={shop.id}
              className={`${styles.shopCard} ${selectedShop?.id === shop.id ? styles.selected : ""}`}
              onClick={() => setSelectedShop(shop)}
              style={{ cursor: 'pointer', border: selectedShop?.id === shop.id ? '2px solid #00B894' : 'none' }}
            >
              <div className={styles.imageArea}>
                <img
                  src={shop.image_url || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400"}
                  alt={shop.name}
                  className={styles.shopImage}
                />
                <div className={styles.categoryIcon}>
                  {shop.category === "飲食" ? "🍴" : "🛍️"}
                </div>
                {shop.rating && (
                  <div className={styles.ratingBadge} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255,255,255,0.9)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#f1c40f'
                  }}>
                    ⭐ {shop.rating}
                  </div>
                )}
              </div>
              <h3 className={styles.shopName}>{shop.name}</h3>
              <div className={styles.cardDivider} />
              <div className={styles.shopDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>営業状況：</span>
                  <span style={{
                    color: shop.open_time === "Now Open" || shop.open_time === "営業中" ? "#00B894" : "#ff7675",
                    fontWeight: 'bold'
                  }}>
                    {shop.open_time === "Now Open" ? "● 営業中" : shop.open_time}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>場所：</span>
                  <span style={{ fontSize: '0.8rem' }}>{shop.address}</span>
                </div>
                {shop.tel && shop.tel !== "000-0000-0000" && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>TEL：</span>
                    <span>{shop.tel}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Google Map Section */}
      <div className={styles.mapWrapper} id="shop-map">
        <h3 className={styles.mapTitle}>
          {selectedShop ? `${selectedShop.name} の場所` : "周辺マップ"}
        </h3>
        <div className={styles.mapContainer}>
          {process.env.NEXT_PUBLIC_MAP_KEY ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "30px" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={selectedShop
                ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAP_KEY}&q=place_id:${selectedShop.id}`
                : `https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_MAP_KEY}&q=restaurant+in+Enoshima+Nakamise`
              }
            ></iframe>
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#FDF4EC", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
              Google Map 読み込みエリア (API Key が必要です)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
