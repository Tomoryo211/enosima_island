"use client";

type Props = {
    onSearch: (q: string, category: string, page: number) => void;
    page: number;
};

export default function Search({ onSearch, page }: Props) {
    return (
        <div style={{ marginBottom: 40 }}>
        <h2 style={{ textAlign: "center" }}>現在営業中店舗</h2>

        <div style={{ display: "flex", gap: 12 }}>
            <input
            style={{ flex: 1, padding: 16, borderRadius: 999 }}
            placeholder="検索"
            onChange={(e) => onSearch(e.target.value, "", 1)}
            />
            <button>検索</button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <div>
            <button onClick={() => onSearch("", "food", 1)}>飲食</button>
            <button onClick={() => onSearch("", "experience", 1)}>体験</button>
            </div>

            <div>
            {[1, 2, 3, 4].map((p) => (
                <button key={p} onClick={() => onSearch("", "", p)}>
                {p}
                </button>
            ))}
            <button onClick={() => onSearch("", "", page + 1)}>次へ</button>
            </div>
        </div>
        </div>
    );
}
