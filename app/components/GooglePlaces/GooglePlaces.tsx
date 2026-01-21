"use client";

import { useState, useEffect } from "react";
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
}

export default function GooglePlaces() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
    const [shopDetails, setShopDetails] = useState<Record<string, ShopDetails>>({});
    const [loadingDetails, setLoadingDetails] = useState<string | null>(null);

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

    const fetchDetails = async (placeId: string) => {
        if (shopDetails[placeId]) {
            setSelectedShopId(selectedShopId === placeId ? null : placeId);
            return;
        }

        setLoadingDetails(placeId);
        try {
            const response = await fetch(`/api/google-places/details?placeId=${placeId}`);
            const data = await response.json();
            if (data.success) {
                setShopDetails(prev => ({ ...prev, [placeId]: data.data }));
                setSelectedShopId(placeId);
            }
        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setLoadingDetails(null);
        }
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
                        <div key={shop.id} className={styles.card}>
                            <div className={styles.imageArea}>
                                <img
                                    src={shop.image_url || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400"}
                                    alt={shop.name}
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
                                    onClick={() => fetchDetails(shop.id)}
                                    disabled={loadingDetails === shop.id}
                                >
                                    {loadingDetails === shop.id ? "読み込み中..." :
                                        selectedShopId === shop.id ? "詳細を閉じる" : "営業詳細を見る"}
                                </button>

                                {selectedShopId === shop.id && shopDetails[shop.id] && (
                                    <div className={styles.infoSection}>
                                        <div className={styles.divider} />

                                        {shopDetails[shop.id].formatted_phone_number && (
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>電話番号</span>
                                                <span className={styles.infoValue}>{shopDetails[shop.id].formatted_phone_number}</span>
                                            </div>
                                        )}

                                        {shopDetails[shop.id].opening_hours?.weekday_text && (
                                            <div className={styles.hoursContainer}>
                                                <div className={styles.infoLabel} style={{ marginBottom: '10px' }}>営業時間</div>
                                                {shopDetails[shop.id].opening_hours?.weekday_text.map((text, index) => {
                                                    const isToday = new Date().getDay() === (index + 1) % 7;
                                                    return (
                                                        <div key={index} className={`${styles.hourItem} ${isToday ? styles.today : ""}`}>
                                                            {text}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {shopDetails[shop.id].website && (
                                            <div className={styles.infoRow} style={{ marginTop: '15px' }}>
                                                <span className={styles.infoLabel}>公式サイト</span>
                                                <a href={shopDetails[shop.id].website} target="_blank" rel="noopener noreferrer" className={styles.infoValue} style={{ color: '#00B894', textDecoration: 'underline' }}>
                                                    Webサイトを開く
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>周辺に店舗が見つかりませんでした。</div>
                )}
            </div>
        </div>
    );
}
