//利用枚举类型，CacheType.local 0 CacheType.session 1 类型如果传索引值或者顺序就用枚举
enum CacheType {
  local,
  session
}
class Cache {
  storage: Storage
  constructor(type: CacheType) {
    //当type为0时 storage属性为localStorage
    this.storage = type === CacheType.local ? localStorage : sessionStorage
  }
  getItem(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  setItem(key: string, value: any) {
    if (value) {
      return this.storage.setItem(key, JSON.stringify(value))
    }
  }
  removeItem(key: string) {
    return this.storage.removeItem(key)
  }
  clear() {
    return this.storage.clear()
  }
}
const localCache = new Cache(CacheType.local)
const sessionCache = new Cache(CacheType.session)
export { localCache, sessionCache }
