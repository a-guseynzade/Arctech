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
          <p key={i} className="text-gray-500 text-base xl:text-lg">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function RequestQuote() {
  const { t } = useLanguage();

  // Get localized services and contact info
  const services = t("contact.services");
  const contactInfo = t("contact.info");

  // Build contact info items with icons
  const contactInfoItems = [
    { key: "location", Icon: contactInfoIcons.location, ...contactInfo.location },
    { key: "contact", Icon: contactInfoIcons.contact, ...contactInfo.contact },
    { key: "hours", Icon: contactInfoIcons.hours, ...contactInfo.hours },
  ];

  return (
    <section id="services" className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 3xl:max-w-screen-2xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 3xl:gap-24">
          {/* Left - Form */}
          <div>
            <FadeIn direction="down">
              <h2 className="text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-bold text-[var(--dark)] mb-2">
                {t("contact.title")}{" "}
                <span className="text-[var(--primary-brand)]">{t("contact.title_highlight")}</span>
              </h2>
            </FadeIn>
            <p className="text-gray-600 text-base xl:text-lg 2xl:text-xl mb-6 xl:mb-8">
              {t("contact.subtitle")}
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder={t("contact.form.name")} className={inputClassNames} />
                  <Input
                    type="email"
                    placeholder={t("contact.form.email")}
                    className={inputClassNames}
                  />
                </div>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  placeholder={t("contact.form.phone")}
                  className={inputClassNames}
                />
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
              <Textarea
                placeholder={t("contact.form.details")}
                className="bg-gray-50 border-gray-200 text-[var(--dark)] placeholder:text-gray-400 min-h-[120px] focus:border-[var(--primary-brand)] focus:ring-[var(--primary-brand)]/20"
              />
              <FadeIn delay={0.4}>
                <Button className="w-full bg-[var(--primary-brand)] hover:bg-[var(--primary-brand-dark)] text-white font-semibold h-12">
                  {t("contact.form.submit")}
                </Button>
              </FadeIn>
            </form>
          </div>

          {/* Right - Contact Info */}
          <div className="lg:pl-8">
            <h3 className="text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-4xl font-bold text-[var(--dark)] mb-6 xl:mb-8 3xl:mb-10">
              {t("contact.info_title")}
            </h3>

            <div className="space-y-6">
              {contactInfoItems.map(({ key, Icon, title, lines }) => (
                <ContactInfoItem
                  key={key}
                  Icon={Icon}
                  title={title}
                  lines={lines}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
