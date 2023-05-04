const express = require("express");
const db = require("./db");
const utils = require("./utils");
const {v4: uuid} = require('uuid')

const app = express();
app.use(express.json());

// 获取资源
app.get('/api/resources', async (req, res) => {
  const {token} = req.headers;
  if (!token) {
    res.status(200).send({
      code: 200,
      ok: false,
      msg: "token不存在，拒绝访问",
    });
  } else {
    try {
      let jsonObj = await db.getDb();
      const user = jsonObj.users.find(user => user.token === token)
      if (!user) {
        res.status(200).send({
          code: 200,
          ok: false,
          msg: "token错误，无法获取数据",
        });
      } else {
        const role = jsonObj.role[user.identity];
        res.status(200).send({
          code: 200,
          ok: true,
          msg: "获取数据成功",
          data: {
            uid: user.uid,
            role: { rid: role.rid, name: role.name },
            res: role.res
          }
        })
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        ok: false,
        error
      });
    }
  }
})

// 注册用户
app.post("/api/user/register", async (req, res) => {
  let body = req.body;
  let jsonObj = await db.getDb();
  const { unPassed, message } = utils.validateUserRegister(body, jsonObj);

  if (unPassed) {
    res.status(401).json({
      code: 401,
      ok: false,
      error: message,
    });
  } else {
    jsonObj.users.push({
      uid: utils.generateUserId(jsonObj),
      account: body.account,
      password: body.password,
      identity: body.identity,
      token: uuid()
    });

    try {
      let isError = await db.serveDb(jsonObj);
      if (!isError) {
        res.status(200).send({
          code: 200,
          ok: true,
          msg: "添加成功",
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        ok: false,
        error,
      });
    }
  }
});

// 登录用户
app.post("/api/user/login", async (req, res) => {
  let body = req.body;
  let jsonObj = await db.getDb();
  const user = jsonObj.users.find(user => user.account === body.account)
  const { unPassed, message } = utils.validateUserLogin(body, user);

  if (unPassed) {
    res.status(401).json({
      code: 401,
      ok: false,
      error: message,
    });
  } else {
    res.status(200).send({
      code: 200,
      ok: true,
      msg: "登录成功",
      data: {
        account: user.account,
        identity: user.identity,
        id: user.id,
        token: user.token
      }
    });
  }
});

app.listen(7003, (err) => {
  if (!err) {
    console.log("服务器运行于 http://127.0.0.1:7003");
  } else {
    console.log("Error" + err);
  }
});
