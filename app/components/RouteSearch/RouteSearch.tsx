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
    { id: 1, name: "弁財天仲見世通り", description: "江の島の玄関口。食べ歩きも楽しめる活気ある通りです。", x: 20, y: 70 },
    { id: 2, name: "江島神社 (辺津宮)", description: "日本三大弁財天の一つ。まずはここでお参りを。", x: 40, y: 50 },
    { id: 3, name: "中津宮", description: "朱塗りの美しい社殿。美に関わる神様としても有名です。", x: 60, y: 40 },
    { id: 4, name: "サムエル・コッキング苑", description: "南国ムード漂う植物園。シーキャンドルもここにあります。", x: 80, y: 30 },
];

const afternoonPoints: RoutePoint[] = [
    { id: 1, name: "龍恋の鐘", description: "恋人の丘。相模湾を一望できる絶景のラブスポットです。", x: 20, y: 30 },
    { id: 2, name: "稚児ヶ淵", description: "隆起海床。夕日の名所としても知られる岩場です。", x: 45, y: 55 },
    { id: 3, name: "江の島岩屋", description: "長い年月を経て波に削られた神秘的な自然の洞窟です。", x: 70, y: 70 },
    { id: 4, name: "参道への抜け道", description: "帰りは裏橋などを通り、ゆっくりと戻ります。", x: 90, y: 40 },
];

export default function RouteSearch() {
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
                        <div className={`${styles.mapPlaceholder} ${styles.morningMap}`}>
                            {/* SVG Route Line */}
                            <svg className={styles.routeSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path
                                    d="M 20 70 Q 30 60 40 50 T 60 40 T 80 30"
                                    fill="none"
                                    stroke="#FF9F43"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 2"
                                />
                                {morningPoints.map((p) => (
                                    <g key={p.id}>
                                        <circle cx={p.x} cy={p.y} r="3" fill="#FF9F43" />
                                        <text x={p.x} y={p.y - 5} textAnchor="middle" fontSize="4" fill="#333" fontWeight="bold">
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
                                    <h4 className={styles.locationName}>{p.name} &gt;</h4>
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
                        <div className={`${styles.mapPlaceholder} ${styles.afternoonMap}`}>
                            {/* SVG Route Line */}
                            <svg className={styles.routeSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path
                                    d="M 20 30 Q 35 40 45 55 T 70 70 T 90 40"
                                    fill="none"
                                    stroke="#54A0FF"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 2"
                                />
                                {afternoonPoints.map((p) => (
                                    <g key={p.id}>
                                        <circle cx={p.x} cy={p.y} r="3" fill="#54A0FF" />
                                        <text x={p.x} y={p.y - 5} textAnchor="middle" fontSize="4" fill="#333" fontWeight="bold">
                                            {p.id}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div className={styles.locationList}>
                        {afternoonPoints.map((p) => (
                            <div key={p.id} className={styles.locationItem}>
                                <div className={`${styles.markerCircle} ${styles.afternoonMarker}`}>{p.id}</div>
                                <div className={styles.locationContent}>
                                    <h4 className={styles.locationName}>{p.name} &gt;</h4>
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
