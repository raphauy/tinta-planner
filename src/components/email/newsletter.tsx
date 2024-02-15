import { Body, Container, Head, Hr, Html, Row, Section, Tailwind } from "@react-email/components";
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';

interface Props {
  content: string
  slug: string
  mailId: string
  banner: string
  footerText: string
  linkHref: string
  linkText: string
}

const baseUrl = process.env.NEXTAUTH_URL

export default function Newsletter({ content, slug, mailId, banner, footerText, linkHref, linkText }: Props) {
  return (
    <Html className="w-full">
      <Head />
      <Tailwind>
        <Body className="w-full font-sans text-gray-600 bg-gray-100">
          <div className="w-full bg-white shadow-sm">
            <Img
              src={banner}
              width="100%"
              height="auto"
              alt="Newsletter"
            />
            <Section className="my-6 text-[16px] leading-[23px] w-full">
              <div className="mx-6" dangerouslySetInnerHTML={{ __html: content }} />
              <Hr />
              <Row>
                <Text className="mx-6 whitespace-pre-line">
                  {footerText}
                </Text>
                <Link className="mx-6" href={linkHref}>
                  {linkText}
                </Link>
              </Row>
            </Section>
          </div>
        </Body>
      </Tailwind>
    </Html>
  )
}