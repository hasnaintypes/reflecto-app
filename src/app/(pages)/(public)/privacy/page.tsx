"use client";
import React from "react";
import { AppHeader, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function PrivacyPolicy() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    { id: "personal-info", title: "What Personal Information we collect" },
    {
      id: "use-info",
      title: "What we do with the Personal Information we collect",
    },
    { id: "disclosure", title: "When we Disclose Personal Information" },
    {
      id: "cookies",
      title: "How we use cookies and collect information using technology",
    },
    { id: "security", title: "Security" },
    {
      id: "transfer",
      title: "We may Transfer Personal Information to Other Countries",
    },
    { id: "links", title: "Links to other websites" },
    { id: "choices", title: "Your Choices" },
    {
      id: "access",
      title: "Accessing and Correcting your Personal Information",
    },
    { id: "children", title: "Children" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <main className="bg-background min-h-screen">
      <AppHeader />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Last Updated March 8th, 2026
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Table of Contents - Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:col-span-3 lg:block"
          >
            <div className="sticky top-24">
              <h2 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                Table of contents
              </h2>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-muted-foreground hover:text-foreground block w-full text-left text-sm transition-colors"
                  >
                    {index + 1}. {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-9"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-primary mb-4 text-2xl font-bold">
                  Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This privacy policy sets out how Reflecto (&quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;), an open source project
                  maintained by Hasnain, collects, uses, and discloses any
                  personal information that you give us or that we collect when
                  you use our website or Services. If you do not agree with any
                  terms of this Privacy Policy, please exercise the choices we
                  describe in this Policy, or do not use the Services and do not
                  give us any personal information.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  By using our website or Services, or by choosing to give us
                  personal information, you consent to this Privacy Policy and
                  the processing of your Personal Information. If you do not
                  agree with any terms of this Privacy Policy, please exercise
                  the choices we describe in this Policy, or do not use the
                  Services and do not give us any personal information.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Reflecto may change this policy from time to time by updating
                  this page. You should check this page from time to time to
                  ensure that you are happy with any changes. Your continued
                  access to and/or use of our website or Services after any such
                  changes constitutes your acceptance of, and agreement to this
                  Privacy Policy, as revised.
                </p>
              </section>

              {/* Section 1 */}
              <section id="personal-info" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  1. What Personal Information we collect
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To use our Services, you may choose to provide us your email
                  address, profile information such as name and avatar. When you
                  create journal entries, we collect the content you write,
                  including text, tags, people mentioned, and any images you
                  upload. You may also choose to provide us with additional
                  information such as your preferences, settings, and feedback.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  We also collect information about your usage of our Services,
                  such as pages viewed, features used, and activity patterns.
                  This helps us improve our Services and provide you with a
                  better experience.
                </p>
              </section>

              {/* Section 2 */}
              <section id="use-info" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  2. What we do with the Personal Information we collect
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We use your personal information to:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Create and manage your account</li>
                  <li>Store and sync your journal entries across devices</li>
                  <li>Send you service-related notifications and updates</li>
                  <li>
                    Respond to your comments, questions, and customer service
                    requests
                  </li>
                  <li>Analyze usage patterns to improve user experience</li>
                  <li>
                    Detect, prevent, and address technical issues and security
                    threats
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="disclosure" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  3. When we Disclose Personal Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We respect your privacy and do not sell, trade, or rent your
                  personal information to third parties. We may share your
                  personal information only in the following circumstances:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> We may share information
                    with trusted third-party service providers who assist us in
                    operating our Services (e.g., hosting, analytics, email
                    services)
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose
                    information if required by law, court order, or governmental
                    authority
                  </li>
                  <li>
                    <strong>Protection of Rights:</strong> We may disclose
                    information to protect the rights, property, or safety of
                    Reflecto, our users, or others
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In the event of a
                    merger, acquisition, or sale of assets, your information may
                    be transferred to the new entity
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="cookies" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  4. How we use cookies and collect information using technology
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track
                  activity on our Services and hold certain information. Cookies
                  are files with a small amount of data that are sent to your
                  browser from a website and stored on your device.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  We use cookies to:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>Keep you signed in and remember your preferences</li>
                  <li>
                    Understand and save your preferences for future visits
                  </li>
                  <li>Analyze usage patterns and improve our Services</li>
                  <li>Provide security features and prevent fraud</li>
                </ul>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  You can instruct your browser to refuse all cookies or to
                  indicate when a cookie is being sent. However, if you do not
                  accept cookies, you may not be able to use some portions of
                  our Services.
                </p>
              </section>

              {/* Section 5 */}
              <section id="security" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  5. Security
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The security of your personal information is important to us.
                  We use industry-standard security measures to protect your
                  data, including encryption, secure servers, and regular
                  security audits. However, please be aware that no method of
                  transmission over the Internet or method of electronic storage
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  We encourage you to use a strong, unique password for your
                  account. Never share your password with anyone.
                </p>
              </section>

              {/* Section 6 */}
              <section id="transfer" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  6. We may Transfer Personal Information to Other Countries
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your information, including personal information, may be
                  transferred to and maintained on computers located outside of
                  your state, province, country, or other governmental
                  jurisdiction where the data protection laws may differ from
                  those of your jurisdiction.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  If you are located outside the United States and choose to
                  provide information to us, please note that we transfer the
                  data, including personal information, to the United States and
                  process it there. Your consent to this Privacy Policy followed
                  by your submission of such information represents your
                  agreement to that transfer.
                </p>
              </section>

              {/* Section 7 */}
              <section id="links" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  7. Links to other websites
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our Services may contain links to other websites that are not
                  operated by us. If you click on a third-party link, you will
                  be directed to that third party&apos;s site. We strongly
                  advise you to review the privacy policy of every site you
                  visit.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  We have no control over and assume no responsibility for the
                  content, privacy policies, or practices of any third-party
                  sites or services.
                </p>
              </section>

              {/* Section 8 */}
              <section id="choices" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  8. Your Choices
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  You have several choices regarding your personal information:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>
                    <strong>Access and Update:</strong> You can access and
                    update your account information at any time through your
                    account settings
                  </li>
                  <li>
                    <strong>Delete Content:</strong> You can delete your journal
                    entries, tags, and other content at any time
                  </li>
                  <li>
                    <strong>Email Preferences:</strong> You can manage your
                    daily reminder notifications from your account settings
                  </li>
                  <li>
                    <strong>Cookies:</strong> You can set your browser to refuse
                    cookies or alert you when cookies are being sent
                  </li>
                  <li>
                    <strong>Account Deletion:</strong> You can request deletion
                    of your account by contacting us
                  </li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="access" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  9. Accessing and Correcting your Personal Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, correct, or delete your personal
                  information. You can do this by logging into your account and
                  visiting your account settings page. If you need assistance or
                  have questions about your data, please contact us at the email
                  address provided below.
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  We will respond to your request within a reasonable timeframe.
                  In some cases, we may need to verify your identity before
                  processing your request.
                </p>
              </section>

              {/* Section 10 */}
              <section id="children" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  10. Children
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our Services are not directed to children under the age of 13.
                  We do not knowingly collect personal information from children
                  under 13. If you are a parent or guardian and you are aware
                  that your child has provided us with personal information,
                  please contact us. If we become aware that we have collected
                  personal information from children without verification of
                  parental consent, we take steps to remove that information
                  from our servers.
                </p>
              </section>

              {/* Section 11 */}
              <section id="contact" className="mb-12 scroll-mt-24">
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  11. Contact Us
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div className="bg-secondary/50 mt-6 rounded-lg p-6">
                  <p className="text-foreground font-semibold">Reflecto</p>
                  <p className="text-muted-foreground mt-2">
                    Email: hasnainoffice2024@gmail.com
                  </p>
                  <p className="text-muted-foreground">
                    Website: tryreflecto.vercel.app
                  </p>
                </div>
              </section>

              {/* Back to Top Button */}
              <div className="mt-12 flex justify-center">
                <button
                  onClick={scrollToTop}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:scale-105 active:scale-95"
                >
                  <span>Back to top</span>
                  <ArrowUp
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
