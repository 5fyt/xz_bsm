import dayjs from 'dayjs'
export const formatDate=(utcString:string)=>{
  return dayjs(utcString).format('YYYY/MM/DD HH:mm:ss')
}
