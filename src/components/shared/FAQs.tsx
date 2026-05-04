import { Container } from "@/components/ui/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Script from "next/script";
import { generateFAQSchema } from "@/lib/seo/faqSchema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const FAQs = ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) => {
  return (
    <section className="py-20">
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)),
        }}
      />
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              // <AccordionItem
              //   key={index}
              //   value={`item-${index}`}
              //   className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              // >
              //   <AccordionTrigger className="text-left hover:no-underline data-[state=open]:text-primary">
              //     <span className="font-semibold">{faq.question}</span>
              //   </AccordionTrigger>
              //   <AccordionContent className="text-muted-foreground leading-relaxed">
              //     <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
              //       <ReactMarkdown remarkPlugins={[remarkGfm]}>
              //         {faq.answer}
              //       </ReactMarkdown>
              //     </div>
              //   </AccordionContent>
              // </AccordionItem>

              <AccordionItem
                key={index}
                 value={`item-${index}`}
                className="border rounded-2xl px-6 shadow-sm data-[state=open]:border-primary/50 transition-colors bg-transparent"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 data-[state=open]:text-primary  font-semibold text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed pb-5 text-base">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {faq.answer}
                  </ReactMarkdown>
                  
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="text-center mt-12">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 font-semibold transition-colors"
            >
              More questions? Talk to the founder <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        {/* Separator Line */}
        <div className="mt-20 border-t border-border" />
      </Container>
    </section>
  );
}