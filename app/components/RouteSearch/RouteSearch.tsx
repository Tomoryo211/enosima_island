"use client";

import styles from "./RouteSearch.module.scss";

type RoutePoint = {
    id: number;
    name: string;
    description: string;
    x: number; // Percent relative to map container
    y: number;
};

const morningPoints: RoutePoint[] = [
    {
        id: 1,
        name: "龍恋の鐘",
        description: "恋人の丘にある伝説の鐘。相模湾を見渡す絶景ポイントです。",
        x: 32,
        y: 62
    },
    {
        id: 2,
        name: "稚児ヶ淵",
        description: "隆起海床が広がる磯場。岩場を歩いて自然の造形美を楽しめます。",
        x: 18,
        y: 78
    },
    {
        id: 3,
        name: "江の島岩屋",
        description: "波の侵食でできた神秘的な自然の洞窟。最奥部まで探検できます。",
        x: 10,
        y: 74
    },
    {
        id: 4,
        name: "江の島サムエル・コッキング苑",
        description: "四季折々の花々が咲き誇る植物園。ここから西へ向かいます。",
        x: 42,
        y: 52
    },
];

const afternoonPoints: RoutePoint[] = [
    {
        id: 1,
        name: "青銅の鳥居",
        description: "江の島のシンボル。ここから歴史ある参道が始まります。",
        x: 53,
        y: 16
    },
    {
        id: 2,
        name: "参道",
        description: "お土産店や食べ歩きグルメが並ぶ賑やかな通りです。",
        x: 50,
        y: 28
    },
    {
        id: 3,
        name: "江の島エスカーのりば",
        description: "高台まで一気に登れるエスカレーター。移動も楽々です。",
        x: 48,
        y: 38
    },
    {
        id: 4,
        name: "江島神社辺津宮",
        description: "美しい社殿。美徳と健康を祈願しましょう。",
        x: 42,
        y: 44
    },
    {
        id: 5,
        name: "江の島サムエル・コッキング苑",
        description: "四季折々の花々が楽しめる、南国情緒豊かな植物園です。",
        x: 42,
        y: 56
    },
    {
        id: 6,
        name: "江の島展望灯台 (シーキャンドル)",
        description: "島のランドマーク。頂上からは360度のパノラマビューが広がります。",
        x: 35,
        y: 56
    },
];

export default function RouteSearch() {
    const mapBaseUrl = "/enoshima-map-clean.png";

    return (
        <section className={styles.container}>
            <div className={styles.titleWrapper}>
                <h2 className={styles.mainTitle}>ルート提案</h2>
                <div className={styles.titleLine}></div>
            </div>

            <div className={styles.splitWrapper}>
                {/* Morning Route */}
                <div className={styles.routeColumn}>
                    <div className={styles.columnHeader}>
                        <h3 className={styles.columnTitle}>午前ルート</h3>
                        <span className={styles.timeTag}>09:00 - 12:00</span>
                    </div>

                    <div className={styles.mapContainer}>
                        <div
                            className={`${styles.mapPlaceholder} ${styles.morningMap}`}
                            style={{ backgroundImage: `url(${mapBaseUrl})` }}
                        >
                            <div className={styles.mapOverlay}></div>
                            {/* SVG Route Line */}
                            <svg className={styles.routeSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path
                                    d="M 48 42 Q 45 45 42 52 Q 38 58 32 62 T 18 78 T 10 74"
                                    fill="none"
                                    stroke="#FF9F43"
                                    strokeWidth="1.2"
                                    strokeDasharray="3 2"
                                />
                                {morningPoints.map((p) => (
                                    <g key={p.id}>
                                        <circle cx={p.x} cy={p.y} r="2.2" fill="#FF9F43" stroke="white" strokeWidth="0.8" />
                                        <text x={p.x} y={p.y} dominantBaseline="central" textAnchor="middle" fontSize="2.8" fill="white" fontWeight="900">
                                            {p.id}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div className={styles.locationList}>
                        {morningPoints.map((p) => (
                            <div key={p.id} className={styles.locationItem}>
                                <div className={styles.markerCircle}>{p.id}</div>
                                <div className={styles.locationContent}>
                                    <h4 className={styles.locationName}>{p.name}</h4>
                                    <p className={styles.locationDesc}>{p.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Afternoon Route */}
                <div className={styles.routeColumn}>
                    <div className={styles.columnHeader}>
                        <h3 className={styles.columnTitle}>午後ルート</h3>
                        <span className={styles.timeTag}>13:00 - 17:00</span>
                    </div>

                    <div className={styles.mapContainer}>
                        <div
                            className={`${styles.mapPlaceholder} ${styles.afternoonMap}`}
                            style={{ backgroundImage: `url(${mapBaseUrl})` }}
                        >
                            <div className={styles.mapOverlay}></div>
                            {/* SVG Route Line */}
                            <svg className={styles.routeSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path
                                    d="M 53 16 Q 51 25 50 28 T 48 38 T 42 44 T 42 56 T 35 56"
                                    fill="none"
                                    stroke="#54A0FF"
                                    strokeWidth="1.2"
                                    strokeDasharray="3 2"
                                />
                                {afternoonPoints.map((p) => (
                                    <g key={p.id}>
                                        <circle cx={p.x} cy={p.y} r="2.2" fill="#54A0FF" stroke="white" strokeWidth="0.8" />
                                        <text x={p.x} y={p.y} dominantBaseline="central" textAnchor="middle" fontSize="2.8" fill="white" fontWeight="900">
                                            {p.id}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div className={styles.locationList}>
                        {afternoonPoints.map((p) => (
                            <div key={p.id} className={`${styles.locationItem} ${styles.afternoonItem}`}>
                                <div className={`${styles.markerCircle} ${styles.afternoonMarker}`}>{p.id}</div>
                                <div className={styles.locationContent}>
                                    <h4 className={styles.locationName}>{p.name}</h4>
                                    <p className={styles.locationDesc}>{p.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
