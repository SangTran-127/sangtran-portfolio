---
slug: cache-cung-voi-redis-trong-nodejs
title: Cache cùng với Redis trong NodeJS server 🥰
author: Sáng Trần
author_title: Regular guy who love programming
author_url: https://github.com/SangTran-127
author_image_url: https://avatars.githubusercontent.com/SangTran-127
image: https://res.cloudinary.com/sangtran127/image/upload/v1674398000/blog-assests/cache-voi-red%C3%AD-21-01-2022/gif_mhtd6n.gif
tags: [redis, backend, nodejs]
date: "2023-01-22"
---
Nếu đã hiểu được Redis là gì, chúng ta cùng tìm hiểu thêm cách server sử dụng cache thông qua Redis như thế nào, cụ thể NodeJS 😉

<!-- truncate-->

### Mục lục


## Cache là gì 

Cache là bộ nhớ đệm, được lưu trữ trong bộ nhớ, nên có tốc độ truy xuất rất nhanh. Thay vì ta yêu cầu dữ liệu từ Server sau đó **Server** sẽ truy vấn đến Database thì nhờ có cache nó sẽ trả ta dữ liệu có sẵn ngay lập tức, không cần phải truy vấn đến Database
## Cách hoạt động

Trước khi tìm hiểu về cách hoạt động là gì, bạn nên hiểu Redis là gì ở bài viết trước của mình tại [đây](https://www.sangtran.dev/blog/rush-b-redis-co-ban)

Gỉa sử bạn sở hữu một tiệm trà sữa rất đông khách, nếu cứ mỗi một khách đến order rồi bạn mới pha trà sữa thì sẽ rất là lâu mới giải quyết được tất cả những người chờ ở phía sau, họ có thể bỏ đi vì chờ quá lâu. Do đó ta phải dùng một cách đó là làm sẵn hàng loạt các ly trà sữa rồi bỏ sẵn tủ lạnh ai đến rồi mình có sẵn đưa họ

Đó là cách để giải quyết bài toán nhưng nhược điểm lớn nhất chính là trà sữa làm sẵn nếu để lâu sẽ hết hạn

Tiệm trà sữa ở đây đóng vai trò là **Server**, trà sữa là dữ liệu cần gửi cho các **Client** và thời gian trà sữa hết hạn chính là thời gian sống của Cache

Cache cũng tương tự như vậy, nếu **Server** nhận request từ nhiều **Client** về một sản phẩm nào đó thì ta sử dụng cache trả sẵn kết quả cho **Client** liền giúp cho **Server** đỡ phải truy vấn đến Database rồi trả ra theo từng request. Nhưng ta sẽ phải set thời gian tồn tại của Cache đó giống như việc trà sữa hết hạn vậy

Chúng ta cùng xem qua mô hình này, Redis sẽ đóng vai trò trung gian giữa **Client** và **Server** với Database

![thumb](https://res.cloudinary.com/sangtran127/image/upload/v1674397324/blog-assests/cache-voi-red%C3%AD-21-01-2022/thumbnail_mxo6p4.jpg)

Cách hoạt động rất đơn giản:

Đầu tiên, **Client** sẽ gửi request đến **Server**

Sau đó, Redis sẽ check xem dữ liệu đó có nằm trong cache sẵn chưa ?

Nếu CÓ, trả ngay về cho **Client**

Nếu KHÔNG(miss cache), **Server** sẽ truy vấn đến Database rồi trả về cho **Client**, sau đó lưu vào ***cache*** cho những lần sau nếu có ai request sẽ có sẵn mà trả ra.

Ở đây mình chỉ cover qua phần rất cơ bản về Redis ***cache***, mình biết sẽ có việc như 2 người truy cập set ***cache*** cùng lúc không đảm bảo tính nhất quán/nguyên tử của dữ liệu thì mình sẽ cover ở những bài viết sau

## Code Pokemon api cơ bản sử dụng cache

Hãy cùng áp dụng ***Redis cache*** vào một **Server** trả về Pokemon Api cơ bản như sau

```js
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/pokemons", async (req, res) => {
  const { results } = await (
    await fetch("https://pokeapi.co/api/v2/pokemon")
  ).json();
  res.send(results);
});

app.get("/pokemons/:name", async (req, res) => {
  const pokemon = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
  ).json();
  res.send(pokemon);
});

app.listen(8080, () => {
  console.log(`server running`);
});
```

Khi ta request đến /pokemons, ta thấy được thời gian trả về là **422ms** 

![before cache](https://res.cloudinary.com/sangtran127/image/upload/v1674395409/blog-assests/cache-voi-red%C3%AD-21-01-2022/A%CC%89nh_chu%CC%A3p_Ma%CC%80n_hi%CC%80nh_2023-01-22_lu%CC%81c_18.59.45_xuulmx.png)

Hãy cùng cài redis vào nodeJS **Server** bằng lệnh sau và import vào

```bash
npm i redis
```

Trước tiên, chạy **Redis Server** bằng cách gõ lệnh ``redis-server``

![redis-server](https://res.cloudinary.com/sangtran127/image/upload/v1674395363/blog-assests/cache-voi-red%C3%AD-21-01-2022/redis-server_b4mkyl.png)

Hãy cùng khai báo nó vào code thôi

```js
import Redis from "redis";

const redisClient = Redis.createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();
```
Ta sẽ code thêm ở phần route /pokemons

```js
app.get("/pokemons", async (req, res) => {
  // lấy cache
  const pokemons = await redisClient.get("pokemons");
  // TH: Có cache
  if (pokemons != null) {
    return res.send(JSON.parse(pokemons));
  }
  // TH: Không có cache, đi set Cache
  const { results } = await (
    await fetch("https://pokeapi.co/api/v2/pokemon")
  ).json();
  // set cache
  redisClient.setEx("pokemons", 3600, JSON.stringify(results));
  res.send(results);
});
```

Rất đơn giản chỉ cần follow theo flow ở trên, có cache -> trả ngay, không có -> set cache. Đối với hàm ``setEx()`` nhận các paramters gồm: pokemons(tên), 3600(thời gian tồn tại, tính bằng giây) và kết quả(nhớ stringify vì gía trị trong Redis là string)

Sau đây là kết quả tốc độ trả về khi có cache:

![after cache](https://res.cloudinary.com/sangtran127/image/upload/v1674395268/blog-assests/cache-voi-red%C3%AD-21-01-2022/A%CC%89nh_chu%CC%A3p_Ma%CC%80n_hi%CC%80nh_2023-01-22_lu%CC%81c_20.47.43_znuupy.png)

Tốc độ trả về chỉ còn là **4ms**, nhanh hơn **105** lần so với lần không có cache(**422ms**)

## Refactor để sử dụng cho nhiều request khác nhau

Nếu chương trình bạn cần sử dụng cache nhiều cho các loại request khác nhau, vd: pokemon, pokemons/:name,... Thay vì cứ phải viết đi viết lại. Ta sẽ code lại một function dùng để set/get cache

```js
/**
 * @param {string} key
 * @param {requestCallback} callback
 * @param {number} expiration
 */
async function handleCache(key, callback, expiration = 3600) {
  const result = await redisClient.get(key);
  if (result) return JSON.parse(result);
  const resultNotCache = await callback();
  redisClient.setEx(key, expiration, JSON.stringify(resultNotCache));
  return resultNotCache;
}
```
Như vậy là ta đã refactor xong, ta có thể sử dụng ``hanldeCache()`` cho /pokemons và /pokemons/:name hoặc những cái khác mà không cần viết lại 

```js
app.get("/pokemons", async (req, res) => {
  const pokemon = await handleCache(
    "pokemon",
    async () => {
      const { results } = await (
        await fetch("https://pokeapi.co/api/v2/pokemon")
      ).json();
      return results;
    },
    1299
  );

  res.send(pokemon);
});
```
Đối với /pokemons/:name

```js
app.get("/pokemons/:name", async (req, res) => {
  const pokemon = await handleCache(`pokemon-${req.params.name}`, async () => {
    const pokemonName = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    ).json();
    return pokemonName;
  });
  res.send(pokemon);
});
```

Như vậy là đã xong phần code, ta có thể sử dụng ``redis-cli`` để kiểm tra các cache mà chúng ta đã code bằng những lệnh cơ bản từ bài blog trước như flushall(xoá hết cache), ttl(check expiration),... Lần sau mình sẽ sử dụng Redis nâng cao hơn cụ thể là tính đồng nhất dữ liệu và những cách sử dụng Redis hay ho khác không chỉ mỗi Cache

Hi vọng bài chia sẻ này hữu ích với mọi người! 
> Cheers 🍺
