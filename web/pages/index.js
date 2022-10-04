import Head from "next/head";
import prisma from "../lib/prisma";

export default function Home({ products, productsFromSql }) {
  return (
    <div>
      <Head>
        <title>passersby</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ textAlign: "center", margin: "0 auto" }}>
        <h1>DATABASE TEST</h1>
        <div style={{ padding: "30px" }}>
          <h3>SELECT</h3>
          <h4>Prisma</h4>
          <table style={{ marginLeft: "auto", marginRight: "auto" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #444444" }}>id</th>
                <th style={{ border: "1px solid #444444" }}>category</th>
                <th style={{ border: "1px solid #444444" }}>name</th>
                <th style={{ border: "1px solid #444444" }}>description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ border: "1px solid #444444" }}>{product.id}</td>
                  <td style={{ border: "1px solid #444444" }}>
                    {product.category.name}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {product.name}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {product.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Raw SQL</h4>
          <table style={{ margin: "30px auto" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #444444" }}>id</th>
                <th style={{ border: "1px solid #444444" }}>category</th>
                <th style={{ border: "1px solid #444444" }}>name</th>
                <th style={{ border: "1px solid #444444" }}>description</th>
              </tr>
            </thead>
            <tbody>
              {productsFromSql.map((product) => (
                <tr key={product.product_id}>
                  <td style={{ border: "1px solid #444444" }}>
                    {product.product_id}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {product.category_name}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {product.product_name}
                  </td>
                  <td style={{ border: "1px solid #444444" }}>
                    {product.product_description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "20px" }}>
          <h3>INSERT</h3>
          <input
            type="text"
            id="id"
            placeholder="id"
            style={{ margin: "0px 10px" }}
          />
          <input
            type="text"
            id="name"
            placeholder="name"
            style={{ margin: "0px 10px" }}
          />
          <input
            type="text"
            id="description"
            placeholder="description"
            style={{ margin: "0px 10px" }}
          />
          <button>저장</button>
        </div>
      </div>
    </div>
  );
}

/*---------- Read ----------*/
export async function getStaticProps(context) {
  // prisma
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  const products = data.map((product) => ({
    ...product,
    price: product.price.toString(), //convert decimal value to string to pass through as json
  }));

  // raw SQL
  const dataFromSql = await prisma.$queryRaw`
    SELECT  A.id as product_id
          , A.name as product_name
          , A.description as product_description
          , B.name as category_name   
      FROM Product A 
      LEFT OUTER JOIN Category B 
           ON B.id = A.category_id
  `;
  const productsFromSql = dataFromSql.map((productFromSql) => ({
    ...productFromSql,
    //price: productFromSql.price.toString(),
  }));

  const newProducts = await prisma.product.createMany({
    data: [
      {
        id: 4,
        name: "테스트 모자",
        description: "테스트 모자입니다.",
        price: 10000,
        // image: null,
        category_id: 1,
      },
      {
        id: 5,
        name: "테스트 모자2",
        description: "테스트 모자2입니다.",
        price: 20000,
        // image: null,
        category_id: 2,
      },
    ],
  });

  return {
    props: { products, productsFromSql },
  };
}
