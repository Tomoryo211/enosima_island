"use client";
import { useEffect, useState } from "react";

type Shop = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

export default function Shop() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/shop")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(true);
          return;
        }
        setShops(data.data);
      });
  }, []);

  if (error) {
    return <p>データ取得に失敗しました</p>;
  }

  return (
    <div>
      {/* 🔍 検索UI（見た目用） */}
      <div style={{ marginBottom: 24 }}>
        <input placeholder="キーワード検索" />
        <button>検索</button>
      </div>

      {/* 🗺 Google Map表示エリア（後でAPIキー） */}
      <div
        style={{
          width: "100%",
          height: 300,
          background: "#ddd",
          borderRadius: 16,
          marginBottom: 24,
        }}
      >
        Google Map 表示エリア
      </div>

      {/* 🏪 店舗一覧 */}
      <div>
        {shops.map((shop) => (
          <div key={shop.id}>
            <h3>{shop.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
