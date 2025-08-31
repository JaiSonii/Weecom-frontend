export interface Product {
  id: number
  title: string
  price: number
  category: string
  stock: number
}

export interface APIResponse{
    products : Product[],
    total : number,
    skip : number,
    limit : number
}

export interface Category{
    slug : string,
    name : string
}