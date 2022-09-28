import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import type {NextApiRequest, NextApiResponse} from 'next';

const handler =async (req:NextApiRequest, res: NextApiResponse) => {
    const {query:{offset, limit}} = req;
    const response =  await getComics(Number(offset) ,Number(limit) );
    res.status(200).json({
    data: response.data,
    });
}

export default handler;
