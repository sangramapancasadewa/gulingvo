let handler = async(m, { conn }) => {
  var txt = `
_*Kebijakan Privasi, Syarat Ketentuan dan Peraturan Bot*_

*Kebijakan Privasi*
_1. Bot tidak akan menyebarkan nomor users._
_2. Bot tidak akan menyimpan media yang dikirimkan oleh users._
_3. Owner akan menjaga setiap privasi chat users._

*Peraturan Bot*
_1. Users dilarang menelfon maupun video call nomor bot._
_2. Users dilarang mengirimkan berbagai bug, virtex, dll ke nomor bot._
_3. Users diharap tidak melakukan spam dalam penggunaan bot._
_4. Users dilarang menambahkan nomor bot secara illegal, untuk menambahkan silahkan hubungi owner._
_5. Users dilarang melakukan spam terhadap bot secara terus menerus, sangsi ban permanent._

*Syarat Ketentuan Bot*
_1. Bot *tidak akan bertanggungjawab atas apapun yang users lakukan terhadap fitur bot.*_
_2. Owner akan memberikan hukuman: block atau ban terhadap users yang melanggar peraturan._

*Note:*
_1. Jika ada yang menjual/beli/sewa bot atas nomor ini, harap segera hubungi owner!_
_2. Jika ada bug atau error pada fitur bot, saya mohon untuk lapor kepada owner._
_2. Jika ingin donasi bisa langsung saja ketik /donasi_
_3. Ketik /sewa jika ingin menyewa bot ini._

_Perlu kalian tahu bahwa kami menjaga privasi dari data-data anda!_
`
conn.sendMessage(m.chat,{ image :{ url : "https://telegra.ph/file/ad1ee4417fdb3cd9652f2.jpg" } , caption : txt }, { quoted: m })
}

handler.help = ['rules']
handler.tags = ['info']
handler.command = /^(rules)$/i

export default handler
