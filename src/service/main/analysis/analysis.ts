import { hyRequest2 } from "@/service"


export function getAmountListData() {
  return hyRequest2.get({
    url: '/goods/amount/list'
  })
}
export function getGoodsCategoryCount() {
  return hyRequest2.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return hyRequest2.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return hyRequest2.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return hyRequest2.get({
    url: '/goods/address/sale'
  })
}
