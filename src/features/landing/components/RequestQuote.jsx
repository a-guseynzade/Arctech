import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLanguage } from "@/context/LanguageContext";
import { contactInfoIcons } from "@/features/landing/data/landing-data";
import FadeIn from "@/components/animations/FadeIn";

const inputClassNames =
  "bg-gray-50 border-gray-200 text-[var(--dark)] placeholder:text-gray-400 h-12 focus:border-[var(--primary-brand)] focus:ring-[var(--primary-brand)]/20";

function ContactInfoItem({ Icon, title, lines }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-lg bg-[var(--primary-brand)]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-[var(--primary-brand)]" />
      </div>
      <div>
        <h4 className="text-[var(--dark)] font-semibold mb-1">{title}</h4>
        {lines.map((line, i) => (
          <p key={i} className="text-gray-500 text-base md:text-sm lg:text-base">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function RequestQuote() {
  const { t } = useLanguage();

  const services = t("contact.services");
  const contactInfo = t("contact.info");

  const contactInfoItems = [
    { key: "location", Icon: contactInfoIcons.location, ...contactInfo.location },
    { key: "contact", Icon: contactInfoIcons.contact, ...contactInfo.contact },
    { key: "hours", Icon: contactInfoIcons.hours, ...contactInfo.hours },
  ];

  return (
    <section id="services" className="bg-white py-[clamp(2.5rem,4vw,3.5rem)]">
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(1rem,3vw,2rem)]">
        {/* Уменьшили gap между формой и инфо: max был 6rem, стал 4rem */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,450px),1fr))] gap-[clamp(2rem,4vw,4rem)]">
          
          {/* Left - Form */}
          <div>
            <FadeIn direction="down">
              <h2 className="mb-2 font-bold tracking-tight text-[var(--dark)] text-[clamp(1.75rem,3vw,2.25rem)]">
                {t("contact.title")}{" "}
                <span className="text-[var(--primary-brand)]">
                  {t("contact.title_highlight")}
                </span>
              </h2>
            </FadeIn>
            {/* Уменьшили margin-bottom: max был 2.5rem, стал 1.5rem */}
            <p className="mb-[clamp(1rem,2vw,1.5rem)] text-gray-600 text-[clamp(0.9rem,1vw,1rem)]">
              {t("contact.subtitle")}
            </p>

            <form 
              className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.25rem)]" 
              onSubmit={(e) => e.preventDefault()}
            >
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(0.75rem,1.5vw,1.25rem)]">
                  <Input placeholder={t("contact.form.name")} className={inputClassNames} />
                  <Input type="email" placeholder={t("contact.form.email")} className={inputClassNames} />
                </div>
              </FadeIn>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(0.75rem,1.5vw,1.25rem)]">
                <Input type="tel" placeholder={t("contact.form.phone")} className={inputClassNames} />
                <Select>
                  <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-400 h-12">
                    <SelectValue placeholder={t("contact.form.service")} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg">
                    {Array.isArray(services) && services.map((service) => (
                      <SelectItem
                        key={service.value}
                        value={service.value}
                        className="text-[var(--dark)] cursor-pointer focus:bg-[var(--primary-brand)] focus:text-white"
                      >
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Уменьшили минимальную высоту textarea с 120px до 100px */}
              <Textarea
                placeholder={t("contact.form.details")}
                className="bg-gray-50 border-gray-200 text-[var(--dark)] placeholder:text-gray-400 min-h-[100px] focus:border-[var(--primary-brand)] focus:ring-[var(--primary-brand)]/20 resize-none"
              />

              <FadeIn delay={0.4}>
                <Button className="w-full bg-[var(--primary-brand)] hover:bg-[var(--primary-brand-dark)] text-white font-semibold h-12 mt-1">
                  {t("contact.form.submit")}
                </Button>
              </FadeIn>
            </form>
          </div>

          {/* Right - Contact Info */}
          <div className="flex flex-col">
            {/* Уменьшили margin-bottom заголовка: max был 3rem, стал 1.5rem */}
            <h3 className="mb-[clamp(1rem,2vw,1.5rem)] font-bold text-[var(--dark)] text-[clamp(1.5rem,2.5vw,1.75rem)] mt-2">
              {t("contact.info_title")}
            </h3>

            <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
              {contactInfoItems.map(({ key, Icon, title, lines }) => (
                <ContactInfoItem key={key} Icon={Icon} title={title} lines={lines} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}