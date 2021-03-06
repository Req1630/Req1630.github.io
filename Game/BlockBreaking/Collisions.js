
export default function CircleToBoxHit(L, R, T, B, x, y, radius)
{
    var hit = 0;
    // 矩形の領域判定1.
    if(L - radius > x || R + radius < x || T - radius > y || B + radius < y){
        return hit;
    }
    // 左上の当たり判定.
    if(L > x && T > y && !((L - x) * (L - x) + (T - y) * (T - y) < radius * radius)){
        return hit;
    }
    hit++;
    // 右上の当たり判定.
    if(R < x && T > y && !((R - x) * (R - x) + (T - y) * (T - y) < radius * radius)){
        return hit;
    }
    hit++;
    // 左下の当たり判定.
    if(L > x && B < y && !((L - x) * (L - x) + (B - y) * (B - y) < radius * radius)){
        return hit;
    }
    hit++;
    // 右下の当たり判定.
    if(R < x && B < y && !((R - x) * (R - x) + (B - y) * (B - y) < radius * radius)){
        return hit;
    }
    hit++;
    return hit;// すべての条件が外れたときに当たっている.
}