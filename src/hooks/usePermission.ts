import { useLoginStore } from '@/store/login/login'
export const usePermission = (permissionStr: string) => {
  const loginStore = useLoginStore()
  const { permission } = loginStore
  return !!permission.find((item) => item.includes(permissionStr))
}
