const request = require("supertest");
const app = require("../../../app");

describe("Intergration test for the matches API", () => {
    describe("Validating query", () => {
        it("GET /v1/api/matches?limit=nan - failure when limit is invalid", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?limit=nan`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("code", 400);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Bad Request");
            expect(res.body).toHaveProperty("errors");
        });

        it("GET /v1/api/matches?offset=nan - failure when offset is invalid", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?offset=nan`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("code", 400);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Bad Request");
            expect(res.body).toHaveProperty("errors");
        });

        it("GET /v1/api/matches?activeStart=not_a_date - failure when activeStart is invalid", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?activeStart=not_a_date`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("code", 400);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Bad Request");
            expect(res.body).toHaveProperty("errors");
        });

        it("GET /v1/api/matches?activeEnd=not_a_date - failure when activeEnd is invalid", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?activeEnd=not_a_date`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("code", 400);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Bad Request");
            expect(res.body).toHaveProperty("errors");
        });

        it("GET /v1/api/matches?limit=10 - success when limit is integer", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?limit=10`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
        });

        it("GET /v1/api/matches?offset=1 - success when offset is integer", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?offset=1`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
        });

        it("GET /v1/api/matches?activeStart=2023-01-01 - success when activeStart is date", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?activeStart=2023-01-01`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
        });

        it("GET /v1/api/matches?activeEnd=2023-01-01 - success when active is date", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?activeEnd=2023-12-31`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
        });

        it("GET /v1/api/matches - success - Matches are not found", async () => {
            const res = await request(app)
                .get(
                    `/v1/api/matches?limit=10&offset=1&activeStart=2020-01-01&activeEnd=2020-12-31&tournament[]=1&tournament[]=2`
                )
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");

            expect(res.body.metadata).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        tournament_name: expect.any(String),
                        tournament_logo: expect.any(String),
                        round: expect.arrayContaining([])
                    }),
                ])
            );
        })

        it("GET /v1/api/matches - success when all query params are valid", async () => {
            const res = await request(app)
                .get(
                    `/v1/api/matches?limit=10&offset=1&activeStart=2023-01-01&activeEnd=2023-12-31&tournament[]=1&tournament[]=2`
                )
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);

            expect(res.body.metadata).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        tournament_name: expect.any(String),
                        tournament_logo: expect.any(String),
                        round: expect.arrayContaining([
                            expect.objectContaining({
                                start_date: expect.any(String),
                                numMatches: expect.any(Number),
                                matches: expect.arrayContaining([
                                    expect.objectContaining({
                                        home_score: expect.any(Number),
                                        away_score: expect.any(Number),
                                        home_team: expect.any(String),
                                        home_logo: expect.any(String),
                                        away_team: expect.any(String),
                                        away_logo: expect.any(String),
                                        matchId: expect.any(Number),
                                        start_time: expect.any(String),
                                        status: expect.any(String),
                                        is_live: expect.any(Number),
                                    }),
                                ]),
                            }),
                        ]),
                    }),
                ])
            );
        });

        it("GET /v1/api/match/count - success when all query params are valid", async () => {
            const res = await request(app)
                .get(
                    `/v1/api/match/count?activeStart=2023-01-01&activeEnd=2023-12-31&tournamentId[]=1&tournamentId[]=2`
                )
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");

            expect(res.body.metadata).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        start_date: expect.any(String),
                        tournamentId: expect.any(Number),
                        numMatches: expect.any(Number),
                    }),
                ])
            );
        });

        it("GET /v1/api/match/count - success - There is no matches ", async () => {
            const res = await request(app)
                .get(
                    `/v1/api/match/count?activeStart=2022-01-01&activeEnd=2022-12-31&tournamentId[]=1&tournamentId[]=2`
                )
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBe(0);
        });
    });
});
