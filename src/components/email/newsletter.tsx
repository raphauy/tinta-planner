import { Body, Container, Head, Hr, Html, Row, Section, Tailwind } from "@react-email/components";
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';

interface Props {
  content: string
  slug: string
  mailId: string
}

const baseUrl = process.env.NEXTAUTH_URL

export default function Newsletter({ content, slug, mailId }: Props) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="w-full py-6 font-sans text-gray-600 bg-gray-100">
          <Container className="w-full my-6 bg-white shadow-sm">
            <Img
              src={`${baseUrl}/api/client/${slug}/banner/${mailId}`}
              width="100%"
              height="auto"
              alt="Newsletter"
            />
            <Section className="my-6 text-[16px] leading-[23px] w-full">
              <div className="mx-6" dangerouslySetInnerHTML={{ __html: content }} />
              <Hr />
              <Row>
                <Text className="mx-6">
                  Gracias por seguir este Newsletter,<br />👋 Te veo en el próximo!<br />— Gabi (@gabizimmeruy)
                </Text>
                <Link className="mx-6" href="https://gabizimmer.com">👉 gabizimmer.com</Link>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}