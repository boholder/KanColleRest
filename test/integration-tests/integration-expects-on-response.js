export function expect200Json(res) {
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.charset).toBe('utf-8');
    expect(parseInt(res.headers['content-length'])).toBeGreaterThan(0);
}

export function expect200Png(res) {
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('image/png');
    expect(parseInt(res.headers['content-length'])).toBeGreaterThan(0);
}

export function expect400(res) {
    expect(res.statusCode).toBe(400);
    expect(parseInt(res.headers['content-length'])).toBeGreaterThan(0);
}

export function expect404(res) {
    expect(res.statusCode).toBe(404);
    expect(parseInt(res.headers['content-length'])).toBeGreaterThan(0);
}