import {createMocks} from 'node-mocks-http';
import handleComicMw from "dh-marvel/pages/api/comicMw.route";



describe('ComicsMw', () => {
    describe('when sending a valid GET shoud respond with an array of comics', () => {
        it('should return a 200 status', async () => {
            const query = "offset=1&limit=12"
            const {req, res} = createMocks({
                method: 'GET',
                Query: query
            });
            await handleComicMw(req, res);
            expect(res._getStatusCode()).toBe(200)
        
        })
    
        
    })
})