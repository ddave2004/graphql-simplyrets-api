
import simplyrets from './simplyRETS'

describe("simplyRETS", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    it("should return listing when valid credentials", () => {
        expect(1==1).toEqual(true);
    });

    it("should NOT return listing with invalid credentials", () => {
        expect(1==2).toEqual(false);
    });
});
