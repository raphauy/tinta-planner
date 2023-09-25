import { getInforme } from "@/services/informeService"
import { IndicatorValue } from "./gestionar/(crud)/actions"
import SocialBox from "./social-box"

interface Props {
  informeId: string
}

export default async function CuerpoInformesPage({ informeId }: Props) {
  const informe= await getInforme(informeId)
  if (!informe) return <div>Informe no encontrado</div>

  const clientId= informe.clientId

  const indicators= informe.dataIndicators
  const instagramIndicatorValues: IndicatorValue[]= getIndicatorValues("Instagram", indicators)
  const facebookIndicatorValues: IndicatorValue[]= getIndicatorValues("Facebook", indicators)
  const linkedinIndicatorValues: IndicatorValue[]= getIndicatorValues("Linkedin", indicators)
  
  return (
    <div id="pdf-target" className="flex flex-col w-full gap-5 px-4 py-5 mb-16 border rounded-md">
      <h1 className="text-2xl font-bold text-center">{informe.name}</h1>
      <SocialBox type="Instagram" indicators={instagramIndicatorValues} notes={informe.notasInstagram} clientId={clientId}/>
      <SocialBox type="Facebook" indicators={facebookIndicatorValues} notes={informe.notasFacebook} clientId={clientId}/>
      <SocialBox type="Linkedin" indicators={linkedinIndicatorValues} notes={informe.notasLinkedin} clientId={clientId}/>
    </div>
  )
}

function getIndicatorValues(type: string, dataIndicators: any[]) {
  return dataIndicators
    .filter((indicator) => indicator.indicator.type===type)
    .map((indicator) => {
      return {
        id: indicator.id,
        name: indicator.indicator.name,
        description: indicator.indicator.description,
        type: indicator.indicator.type,
        icon: indicator.indicator.icon,
        order: indicator.indicator.order,
        value: indicator.value,
        previousValue: indicator.previousValue,
        indicatorId: indicator.indicatorId
      }
    })
    .sort((a, b) => a.order - b.order)
  
}