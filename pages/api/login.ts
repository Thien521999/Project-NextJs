// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../constants/BASE_URL";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `${BASE_URL}/member/login.php`;
  // phuong thuc nguoi dung gui len
  const method = req.method;
  const data = req.body; // data: nguoi dung gui len nam  trong req.body
  // console.log(req.headers.cookie);

  if (method !== "POST") {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Method Not Allowed",
    });
  }

  // console.log("data Api login", data);

  try {
    const resHeroku =await axios({
      method: "POST",
      url,
      data,
      headers: {
        "Content-Type": "application/json",
      }
    });

    // console.log("resHeroku ::", resHeroku);
    res.statusCode = 200;
    // res.setHeader("Content-type", "application/json");
    // res.setHeader("X-Token", "value");
    // res.setHeader("Set-Cookie", "testToken=abc");
    res.json(resHeroku); //res.json: la phan data tra ve
  } catch (error) {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Internal Server Error",
    })
  }
}
