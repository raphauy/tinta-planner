import { getClientOfCurrenUser } from "@/app/(server-side)/services/getClients";
import CommingSoon from "@/components/CommingSoon";

export default async function PilaresPage() {

  const client= await getClientOfCurrenUser()
  if (!client) return <div>Client not found</div>

  const pilares= client.pilars
  
  let index= 0
  let index2= 0

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-3 mx-auto py-14">
        <div className="flex flex-col w-full mb-20 text-center">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">{client.name}</h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {
            pilares.map((pilar) => {
              index++
              if (index > 3) return
              return (
              <div className="p-4 md:w-1/3" key={pilar.id}>
                <div className="flex flex-col h-full p-8 bg-white border rounded-lg shadow-2xl">
                  <div className="flex items-center mb-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white rounded-full" style={{ backgroundColor: pilar.color }}/>
                    <h2 className="text-lg font-medium text-gray-900 title-font">{pilar.name}</h2>
                  </div>
                  <div className="flex-grow">
                    <p className="text-base leading-relaxed">{pilar.description}</p>
                  </div>
                </div>
              </div>  
              )}
            )
          }
        </div>
        <div className="flex flex-wrap justify-center my-5 -m-4">
          {
            pilares.map((pilar) => {
              index2++
              if (index2 <= 3) return
              return (
              <div className="p-4 md:w-1/3" key={pilar.id}>
                <div className="flex flex-col h-full p-8 bg-white border rounded-lg shadow-2xl">
                  <div className="flex items-center mb-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white rounded-full" style={{ backgroundColor: pilar.color }}/>
                    <h2 className="text-lg font-medium text-gray-900 title-font">{pilar.name}</h2>
                  </div>
                  <div className="flex-grow">
                    <p className="text-base leading-relaxed">{pilar.description}</p>
                  </div>
                </div>
              </div>  
              )}
            )
          }
        </div>
      </div>
    </section>
  )
}
