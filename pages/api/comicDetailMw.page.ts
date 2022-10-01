import { getComic } from 'dh-marvel/services/marvel/marvel.service';
import type {NextApiRequest, NextApiResponse} from 'next';

const handler =async (req:NextApiRequest, res: NextApiResponse) => {
    const {query:{comicId}} = req;
    const response =  await getComic(Number(comicId) );
    res.status(200).json({
    data: response.data,
    });
}

export default handler;
