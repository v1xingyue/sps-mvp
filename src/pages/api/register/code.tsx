import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (_: NextApiRequest, res: NextApiResponse) => {
    const code = Math.floor(Math.random() * 1000000) + 19232;
    const salt = "wSMfHqVywSjr8N7MmzAA5Yfjzp1JmZck";
    const hash = require('crypto').createHmac('sha256', salt).update(code.toString()).digest('hex');
    res.json({
        hash
    })
}

export default Handler;