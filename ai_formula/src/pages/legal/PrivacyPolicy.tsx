import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {isZhHK ? '隱私政策' : 'Privacy Policy'}
            </h1>
            <p className="text-gray-300 text-lg">
              {isZhHK ? '最後更新日期: 2025年7月15日' : 'Last Updated: July 15, 2025'}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Introduction */}
              <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <p className="text-gray-200 leading-relaxed">
                  歡迎您使用 AI Formula（以下簡稱「本平台」）。我們非常重視您的隱私權，並致力於保護您的個人資料。本隱私政策（以下簡稱「本政策」）旨在說明我們如何收集、使用、分享及保護您的個人資訊。
                </p>
                <p className="text-gray-200 leading-relaxed mt-4">
                  當您註冊、瀏覽或使用本平台提供的 AI 網站平台、AI 教學及 AI 課程等服務時，即表示您已閱讀、瞭解並同意接受本政策的所有內容。
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. 我們收集的資訊類型 (What Information We Collect)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 space-y-6">
                  <p className="text-gray-200">
                    為了提供並優化我們的服務，我們會收集以下幾種類型的資訊：
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">A. 您直接提供的資訊：</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                      <li><strong className="text-yellow-400">帳戶資訊:</strong> 當您註冊帳戶時，我們會收集您的姓名、電子郵件地址、密碼等。</li>
                      <li><strong className="text-yellow-400">個人資料:</strong> 當您完善個人檔案時，您可選擇性提供更多資訊，如頭像、簡介等。</li>
                      <li><strong className="text-yellow-400">付款資訊:</strong> 當您購買付費課程或服務時，我們會透過第三方支付服務提供商（如 Stripe、PayPal）收集處理付款所需的資訊，例如信用卡號碼或帳單地址。我們本身不會儲存您的完整支付卡資訊。</li>
                      <li><strong className="text-yellow-400">學習與互動數據:</strong> 您在參與課程或教學時所提交的作業、專案、考試答案、筆記、以及您在社群或論壇的提問與回覆。</li>
                      <li><strong className="text-yellow-400">通訊內容:</strong> 當您聯繫我們的客服團隊或透過其他方式與我們溝通時，我們會保存通訊記錄。</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">B. 我們自動收集的資訊：</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                      <li><strong className="text-yellow-400">使用日誌與裝置資訊:</strong> 當您使用本平台時，我們會自動記錄技術資訊，包括您的 IP 位址、瀏覽器類型與版本、操作系統、裝置資訊、存取時間與點擊流數據。</li>
                      <li><strong className="text-yellow-400">Cookies 與追蹤技術:</strong> 我們使用 Cookies 和類似技術來提供個人化體驗、分析網站流量、記住您的偏好設定（如登入狀態、語言）。您可以透過瀏覽器設定來管理 Cookies。</li>
                      <li><strong className="text-yellow-400">AI 工具使用數據:</strong> 您與本平台內建 AI 工具互動時的資訊。這可能包括您輸入的查詢或指令。</li>
                    </ul>
                    <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/50 rounded-lg">
                      <p className="text-blue-200">
                        <strong>重要說明:</strong> 我們承諾，不會使用您輸入的個人或商業敏感數據來訓練我們的通用 AI 模型。我們可能會使用經過匿名化和匯總處理後的數據來改善服務效能與體驗。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. 我們如何使用您的資訊 (How We Use Your Information)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200 mb-4">
                    我們將收集到的資訊用於以下目的：
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                    <li><strong className="text-yellow-400">提供與維護服務:</strong> 建立和管理您的帳戶、提供您所購買的課程與教學內容、處理付款。</li>
                    <li><strong className="text-yellow-400">個人化您的體驗:</strong> 根據您的學習進度和興趣，推薦您可能感興趣的內容。</li>
                    <li><strong className="text-yellow-400">溝通與支援:</strong> 回覆您的問題、發送服務相關通知（如課程更新、系統維護）。</li>
                    <li><strong className="text-yellow-400">行銷與推廣:</strong> 在取得您同意的情況下，向您發送我們認為您可能感興趣的課程資訊或電子報。您可以隨時取消訂閱。</li>
                    <li><strong className="text-yellow-400">改善與分析:</strong> 分析使用者行為模式，以了解我們的服務如何被使用，進而改善網站功能、課程設計和 AI 工具的效能。</li>
                    <li><strong className="text-yellow-400">安全與合規:</strong> 保護本平台及使用者的安全，防止詐欺、濫用行為，並履行我們的法律義務。</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. 資訊的分享與揭露 (How We Share Your Information)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200 mb-4">
                    我們不會將您的個人資訊出售給任何第三方。我們僅在以下情況下分享您的資訊：
                  </p>
                  <ul className="list-disc list-inside space-y-3 text-gray-200 ml-4">
                    <li><strong className="text-yellow-400">服務提供商:</strong> 我們會與協助我們運營的第三方合作夥伴分享必要的資訊，例如雲端託管服務 (如 AWS, Google Cloud)、數據分析服務 (如 Google Analytics)、電子郵件發送服務 (如 Mailchimp) 及金流處理服務 (如 Stripe)。這些合作夥伴皆有義務保護您的資料安全。</li>
                    <li><strong className="text-yellow-400">法律要求:</strong> 當基於法律、法院命令或政府機關的要求時，我們可能必須揭露您的資訊。</li>
                    <li><strong className="text-yellow-400">業務轉讓:</strong> 如果本平台涉及合併、收購或資產出售，您的個人資訊可能會作為資產的一部分被轉移。屆時，我們會提前通知您。</li>
                    <li><strong className="text-yellow-400">取得您的同意:</strong> 在上述情況之外，若需與第三方分享您的資訊，我們會事先徵求您的明確同意。</li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. 您的權利與選擇 (Your Rights and Choices)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200 mb-4">
                    根據您所在的地區法律（特別是如 GDPR），您對您的個人資料擁有多項權利：
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                    <li><strong className="text-yellow-400">查詢權 (Right to Access):</strong> 您有權查詢我們持有關於您的哪些個人資料。</li>
                    <li><strong className="text-yellow-400">更正權 (Right to Rectification):</strong> 如果您認為您的資料不正確或不完整，您有權要求更正。</li>
                    <li><strong className="text-yellow-400">刪除權 (Right to Erasure / "Right to be Forgotten"):</strong> 在特定條件下，您有權要求我們刪除您的個人資料。</li>
                    <li><strong className="text-yellow-400">限制處理權 (Right to Restrict Processing):</strong> 在特定條件下，您有權要求我們暫停處理您的個人資料。</li>
                    <li><strong className="text-yellow-400">資料可攜權 (Right to Data Portability):</strong> 您有權要求我們將您的部分資料以結構化、通用的電子格式提供給您或您指定的第三方。</li>
                    <li><strong className="text-yellow-400">反對權 (Right to Object):</strong> 您有權反對我們基於自身正當利益處理您的個人資料，包括用於行銷目的。</li>
                  </ul>
                  <div className="mt-4 p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                    <p className="text-green-200">
                      若要行使上述權利，請透過本政策末尾的「聯絡我們」章節與我們聯繫。
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. 資料安全 (Data Security)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200">
                    我們採取適當的技術和組織措施來保護您的個人資料，防止未經授權的存取、洩露、篡改或毀損。這些措施包括資料傳輸加密 (SSL)、存取控制、定期安全審查等。但請理解，沒有任何網路傳輸或電子儲存方式是 100% 安全的。
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. 國際資料傳輸 (International Data Transfers)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200">
                    本平台為全球性服務，您的個人資料可能會被傳輸到並儲存在您所在國家以外的伺服器上。我們將確保此類傳輸符合適用法律的要求，並採取適當的保護措施，例如使用標準合約條款 (Standard Contractual Clauses)。
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">7. 兒童隱私 (Children's Privacy)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200">
                    我們的服務不針對未滿 16 歲（或您所在司法管轄區規定的其他年齡）的兒童。我們不會故意收集兒童的個人資訊。如果我們發現意外收集了兒童的資料，我們將會立即刪除。
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">8. 政策變更 (Changes to This Policy)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200">
                    我們可能會不時修訂本隱私政策。任何變更都將發布在此頁面上，並更新頂部的「最後更新日期」。對於重大變更，我們可能會透過電子郵件或在網站上發布顯著通知來告知您。
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">9. 聯絡我們 (Contact Us)</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-200 mb-4">
                    若您對本隱私政策有任何疑問、意見，或希望行使您的資料保護權利，請隨時透過以下方式與我們聯繫：
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                    <li><strong className="text-yellow-400">電子郵件:</strong> privacy@aiformula.com</li>
                    <li><strong className="text-yellow-400">一般聯絡:</strong> info@aiformula.com</li>
                    <li><strong className="text-yellow-400">聯絡表單:</strong> 透過我們的網站聯絡頁面</li>
                  </ul>
                  <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/50 rounded-lg">
                    <p className="text-purple-200 text-sm">
                      <strong>專業提醒:</strong> 本隱私政策為通用範本，實際應用時需要根據您所在地的法律法規（例如：歐盟的 GDPR、加州的 CCPA 等）進行調整，建議諮詢專業律師以確保合規性。
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy; 