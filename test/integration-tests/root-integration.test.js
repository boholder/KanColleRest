import {app} from "../../app";
import request from "supertest";

describe("Test the root path", () => {
    it("response the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});

test('Redirect all unhandled GET request to root',async ()=>{
    const response = await request(app).get('/areallynotexistpath');
    expect(response.statusCode).toBe(302);
})