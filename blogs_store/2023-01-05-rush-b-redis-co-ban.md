---
slug: rush-b-redis-co-ban
title: Rush B Redis cơ bản 💥
author: Sáng Trần
author_title: Regular guy who love programming
author_url: https://github.com/SangTran-127
author_image_url: https://avatars.githubusercontent.com/SangTran-127
image: https://res.cloudinary.com/sangtran127/image/upload/v1672855292/blog-assests/redis-c%C6%A1-b%E1%BA%A3n-05-01-2022/redis_fzqo3g.png
tags: [redis, backend]
date: "2023-01-05"
---

Bài blog hôm nay sẽ tìm hiểu qua khái niệm Redis, gói ghém lại các khái niệm cơ bản về Redis dành cho những người muốn tìm hiểu nhanh nó là gì? Sử dụng như thế nào

<!-- truncate-->

### Mục lục

## Redis là gì ?

Redis a.k.a REmote DIctionary Server là 1 cơ sở dữ liệu mã nguồn mở kiểu NoSQL lưu trữ với dạng Key-Value, có thể được sử dụng như database, thường được sử dụng như bộ nhớ Cache hoạt động chung với các cơ sở dữ liệu khác

Điểm mạnh của nó là lữu trữ dữ liệu trên RAM nên tốc độ truy cập siêu nhanh. So với MySQL, MongoDB, …. dữ liệu được lưu trữ trên ổ cứng.

Do được lưu trữ trên RAM nên cũng có nhược điểm đó là dễ mất dữ liệu nếu Server shutdown

Bao gồm các kiểu dữ liệu cơ bản như: 
	1. STRINGS
	2. LISTS
	3. SETS
	4. HASHES
	5. SORTED SET (ZSET)
	….

## Cài đặt Redis vào máy 

Đối với MacOS, sử dụng homebrew:

```sh
brew install redis
```

Đối với Linux, sử dụng các package manager mà bạn thích để cài, ở đây mình sử dụng [snap](https://snapcraft.io/)

```sh
sudo snap install redis
```

Sau đó sử dụng lệnh `redis-server` để khởi chạy Redis trên máy

## Các lệnh cơ bản trong Redis

Trước khi thực hiện các lệnh Redis trên Terminal thì ta chạy cli theo cú pháp `redis-cli` 

Muốn thoát cli, ta chỉ cần `quit` là xong

**Thêm dữ liệu vào Redis**

Như đã nói Redis lưu data dạng key-value nên muốn lưu dữ liệu ta chỉ cần sử dụng từ khoá SET(không phân biệt hoa thường) và cung cấp key và value theo từ khoá **SET [KEY] [VALUE]**

```sh
SET name SangTran
OK
```

Lúc này nó sẽ trả cho ta chữ OK có nghĩa là đã thêm, để check thì sử dụng từ khoá **GET [KEY]** để lấy nó ra

```sh
GET name
"SangTran"
```

Khi GET ta nhận được giá trị là "SangTran". Mặc định các giá trị trong Redis sẽ được lưu trữ kiểu string

**Xoá dữ liệu**

Tương tự dùng từ khoá `DEL` để xoá, đồng thời sử dụng `EXISTS` để check xem dữ liệu có tồn tại hay không

```sh
DEL name
(integer) 1
```

```sh
EXISTS name
(integer) 0
```

1 đại diện cho TRUE và 0 là FALSE

**Liệt kê danh sách các keys**

```sh
KEYS *
1) "name"
2) "age"
```

Muốn xoá hết dữ liệu ta dùng `flushall` sau đó `KEYS *` kiểm tra lại

```sh
flushall
OK
KEYS *
(empty array)
```

**Xử lý hết hạn của dữ liệu**

Chúng ta chỉ cần nhập `ttl`(time to live) với key để xem được dữ liệu khi nào hết hạn

```sh
ttl name
(integer) -1
```

-1 ở đây có nghĩa là name sẽ không thể hết hạn, 

Khi ta cho name thời hạn bằng `EXPIRE`, với cú pháp **EXPIRE [KEY] [second]**

```sh
EXPIRE name 3
```

Lúc này ta đã cho name có thời hạn tồn tại lại là 3s. Trong lúc còn hạn nếu bạn dùng `ttl`, nó sẽ trả về số giây mà name còn tồn tại, đến khi hết hạn thì sẽ trả giá trị là -2

```sh
ttl name
(integer) 3
ttl name
(integer) 2
ttl name
(integer) 1
ttl name
(integer) -2
```
## LISTS

Hãy cùng đến với kiểu dữ liệu cơ bản đầu tiên của Redis, LISTS cho phép lưu giá trị là danh sách các string dạng KEY [VALUE1, VALUE2, ....]

**LPUSH** 

Để tạo 1 LISTS đầu tiên ta cần truyền KEY và VAlUE đầu tiên bằng `LPUSH`, LPUSH sẽ thêm phần tử vào bên trái của LISTS

VD: hãy cùng thêm 1 vài tên cầu thủ vào players

```sh
LPUSH players Ronaldo
(integer) 1
LPUSH players Messi
(integer) 2
LPUSH players Mbappe
(integer) 3
```

**LRANGE**

Đối với LISTS chúng ta không thể dùng GET thông thường để lấy ra, thay vào đó sử dụng vòng lặp để hiện thị các giá trị, **LRANGE [KEY] [START] [END]**, muốn duyệt từ đầu đến cuối nên ta duyệt từ 0 đến -1

```sh
LRANGE players 0 -1
1) "Mbappe"
2) "Messi"
3) "Ronaldo"
```

Ngoài ra còn 1 số từ khoá khác tương tự bạn có thể tìm hiểu

**RPUSH**

Thêm vào phần tử ở cuối và trả về độ dài phần tử

```sh
RPUSH players Lukaku
(integer) 4
```

**LPOP/RPOP**

Xoá vị trí đầu tiên(LPOP)/cuối(LPOP) trả về và trả về giá trị đã xoá

```sh
LPOP players
"Mbappe"
RPOP players
"Lukaku"
```

## SETS

Tương tự như LISTS chỉ khác ở đây SETS chỉ gồm các giá trị không trùng lặp

**SADD**

Đầu tiên để cần thêm giá trị vào SETS ta dùng `SADD`

```sh
SADD languages JAVA
(integer) 1
SADD languages PYTHON
(integer) 1
```

Nếu chúng ta thêm giá trị trùng lặp, Redis sẽ trả về 0 có nghĩa là không thêm được

```sh 
SADD languages JAVA
(integer) 0
```

**SMEMBERS**

Khi chúng ta cần duyệt xem các giá trị trong SETS chỉ cần dùng `SMEMBERS` và cung cấp KEY là được

```sh
SMEMBERS languages
1) "JAVA"
2) "PYTHON"
```

**SREM**

Remove phần tử trong SETS rất đơn giản chỉ cần sử dụng `SREM`

```sh
SREM languages JAVA
(integer) 1
SMEMBERS languages 
1) "PYTHON"
```

## HASHES

Hashes trong Redis là Key Value lồng nhau, sử dụng để quản lí Key Value dùng để lưu trữ object

**HSET/HGET**

Muốn set giá trị hoặc get giá trị trong HASHES, đơn giản như đang giỡn

```sh
HSET person name SangTran 
(integer) 1
HGET person name
"SangTran"
HSET person age 20
(integer) 1
HGET person age
"20"
```

**HGETALL**

`HGETALL` giúp bạn trả về toàn bộ Key Value của HASHES

```sh
HGETALL person
1) "name"
2) "SangTran"
3) "age"
4) "20"
```

**HDEL** 

Xoá phần tử không thể đơn giản hơn với HDEL

```sh
HDEL person age
(integer) 1
```

**HEXISTS**

Check xem phần tử có tồn tại hay không bằng `HEXISTS`, hãy cùng check xem phần tử `age` mình vừa xoá

```sh
HEXISTS person age
(integer) 0
```

Kết quả trả về 0 có nghĩa là phần tử không tồn tại

Như vậy là mình đã tìm hiểu qua được các kiểu dữ liệu và các lệnh cơ bản, ngoài ra còn rất nhiều lệnh khác và các [kiểu dữ liệu](https://redis.io/docs/data-types/) khác bạn có thể tìm hiểu ở [đây](https://redis.io/). Lần sau mình sẽ sử dụng Redis để Cache server NodeJS đơn giản, mọi người nhớ đón xem ❤️

Hi vọng bài chia sẻ này hữu ích với mọi người! 
> Cheers 🍺

**Nguồn tham khảo:**
 
[Redis basic command](https://redis.io/commands/)

[Redis data types](https://redis.io/docs/data-types/)

