"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./GooglePlaces.module.scss";

interface Shop {
    id: string;
    name: string;
    category: string;
    image_url: string | null;
    lat: number;
    lng: number;
    open_time: string;
    address: string;
    rating: number;
}

interface ShopDetails {
    formatted_phone_number?: string;
    opening_hours?: {
        open_now: boolean;
        weekday_text: string[];
    };
    website?: string;
    vicinity?: string;
    editorial_summary?: {
        language: string;
        overview: string;
    };
}

export default function GooglePlaces() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
    const [shopDetails, setShopDetails] = useState<Record<string, ShopDetails>>({});
    const [loadingDetails, setLoadingDetails] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeShop, setActiveShop] = useState<Shop | null>(null);

    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/google-places");
            const data = await response.json();
            if (data.success) {
                setShops(data.data);
            }
        } catch (error) {
            console.error("Error fetching shops:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDetails = async (shop: Shop) => {
        const placeId = shop.id;
        setActiveShop(shop);

        if (shopDetails[placeId]) {
            setIsModalOpen(true);
            return;
        }

        setLoadingDetails(placeId);
        try {
            const response = await fetch(`/api/google-places/details?placeId=${placeId}`);
            const data = await response.json();
            if (data.success) {
                setShopDetails(prev => ({ ...prev, [placeId]: data.data }));
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setLoadingDetails(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // We keep activeShop for exit animations if any, but modal hides it
    };

    if (loading) {
        return <div className={styles.loading}>江の島の情報を取得中...</div>;
    }

    return (
        <div id="nakamise-shops" className={styles.container}>
            <div className={styles.titleSection}>
                <h2 className={styles.title}>弁財天仲見世通りのお店</h2>
                <p className={styles.subtitle}>江の島のメインストリートの最新営業情報</p>
            </div>

            <div className={styles.grid}>
                {shops.length > 0 ? (
                    shops.map((shop) => (
                        <div key={shop.id} className={styles.card} onClick={() => fetchDetails(shop)}>
                            <div className={styles.imageArea}>
                                <Image
                                    src={shop.image_url || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400"}
                                    alt={shop.name}
                                    width={400}
                                    height={300}
                                    className={styles.shopImage}
                                />
                                {shop.rating && (
                                    <div className={styles.ratingBadge}>
                                        ⭐ {shop.rating}
                                    </div>
                                )}
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.name}>{shop.name}</h3>

                                <div className={styles.statusTag + " " + (shop.open_time === "Now Open" ? styles.open : styles.closed)}>
                                    {shop.open_time === "Now Open" ? "● 営業中" : "○ 営業時間外"}
                                </div>

                                <p className={styles.address}>
                                    📍 {shop.address}
                                </p>

                                <button
                                    className={styles.viewDetailsBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fetchDetails(shop);
                                    }}
                                    disabled={loadingDetails === shop.id}
                                >
                                    {loadingDetails === shop.id ? "読み込み中..." : "詳細を見る"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>周辺に店舗が見つかりませんでした。</div>
                )}
            </div>

            {/* Modal Implementation */}
            {isModalOpen && activeShop && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalBody}>
                            <div className={styles.topInfo}>
                                <div className={styles.modalImageWrapper}>
                                    <Image
                                        src={activeShop.image_url || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600"}
                                        alt={activeShop.name}
                                        width={800}
                                        height={600}
                                        className={styles.modalImage}
                                    />
                                </div>

                                <div className={styles.modalMainDetails}>
                                    <p className={styles.modalCategory}>{activeShop.category}</p>
                                    <h2 className={styles.modalName}>{activeShop.name}</h2>

                                    <div className={styles.modalInfoList}>
                                        <div className={styles.modalInfoItem}>
                                            {(() => {
                                                const details = shopDetails[activeShop.id];
                                                const weekdayText = details?.opening_hours?.weekday_text;
                                                if (weekdayText) {
                                                    const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
                                                    const hoursStr = weekdayText[todayIndex]?.split(': ')[1] || "確認中";
                                                    return <span className={styles.modalHours}>{hoursStr}</span>;
                                                }
                                                return <span className={styles.modalHours}>10:00~18:00</span>;
                                            })()}
                                        </div>
                                        <div className={styles.modalInfoItem}>
                                            <span className={styles.modalHoliday}>
                                                定休日：{shopDetails[activeShop.id]?.opening_hours?.weekday_text?.find(t => t.includes("閉店") || t.includes("定休日") || t.includes("Closed"))?.split(': ')[0] || "年中無休（要確認）"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.descriptionSection}>
                                <div className={styles.descriptionBox}>
                                    {shopDetails[activeShop.id]?.editorial_summary?.overview || "江の島仲見世通りにある素敵なお店です。地元の特産品や美味しいお料理をお楽しみいただけます。"}
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                <button className={styles.backButton} onClick={closeModal}>
                                    戻る
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
