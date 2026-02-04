import { useState } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';

const HelpSupportPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticketForm, setTicketForm] = useState({
    issueType: '',
    description: '',
    screenshot: null as File | null
  });

  const faqs = [
    {
      question: 'How to add products?',
      answer: 'Navigate to the Inventory page and click on "Add Product" button. Fill in the product details including name, batch number, expiry date, quantity, and pricing information. You can also upload purchase bills to automatically extract product information.'
    },
    {
      question: 'How to create offers?',
      answer: 'Go to the Offers page and click "Create New Offer". Select the offer type (percentage discount, flat discount, or buy-get offers), set the discount value, choose applicable products, and define the validity period. The offer will be automatically applied during sales.'
    },
    {
      question: 'How to upload purchase bills?',
      answer: 'Visit the Upload Bills page or use the Quick Actions on the dashboard. Click "Upload Bill", select your purchase invoice file (PDF, JPG, or PNG), and our system will automatically extract product details, quantities, and pricing information for easy inventory updates.'
    },
    {
      question: 'How do reports work?',
      answer: 'The Reports section provides comprehensive analytics including sales reports, purchase reports, inventory reports, customer reports, and GST reports. You can filter by date range, export data to Excel or PDF, and view detailed insights with charts and graphs.'
    },
    {
      question: 'How to manage low stock alerts?',
      answer: 'Low stock alerts are automatically generated when product quantities fall below the minimum threshold. You can view these alerts on the dashboard and in the Inventory page. Configure alert preferences in Settings to customize notification triggers.'
    },
    {
      question: 'How to process returns?',
      answer: 'Go to the Sales page, find the original sale transaction, and click "Return Sale". Select the items being returned, specify the return reason, and the system will automatically update inventory and generate a credit note.'
    }
  ];

  const handleSubmitTicket = () => {
    if (!ticketForm.issueType || !ticketForm.description) {
      alert('Please fill in all required fields');
      return;
    }
    // Submit ticket logic here
    alert('Support ticket submitted successfully! Our team will contact you soon.');
    setTicketForm({ issueType: '', description: '', screenshot: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <Header isCollapsed={isSidebarCollapsed} />
      
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-8`}>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Help &amp; Support</h1>
          <p className="text-gray-600 mt-2">Get help and support for Dose Plus Admin</p>
        </div>

        {/* Help Center - FAQs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-question-line text-teal-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Help Center</h3>
              <p className="text-gray-600 text-sm">Frequently asked questions</p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-gray-800 text-left">{faq.question}</span>
                  <i className={`ri-arrow-down-s-line text-xl text-gray-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}></i>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Contact Support */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-customer-service-2-line text-green-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Contact Support</h3>
                <p className="text-gray-600 text-sm">Reach out to our support team</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-teal-600 text-lg"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Support Email</p>
                  <p className="text-gray-800 font-medium">support@doseplus.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-phone-line text-teal-600 text-lg"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Support Phone</p>
                  <p className="text-gray-800 font-medium">+91 1800 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-teal-600 text-lg"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Business Hours</p>
                  <p className="text-gray-800 font-medium">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Raise a Ticket */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-list-3-line text-orange-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Raise a Ticket</h3>
                <p className="text-gray-600 text-sm">Submit a support request</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Type</label>
                <select
                  value={ticketForm.issueType}
                  onChange={(e) => setTicketForm({ ...ticketForm, issueType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="">Select issue type</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  placeholder="Describe your issue in detail..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{ticketForm.description.length}/500 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Attach Screenshot (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTicketForm({ ...ticketForm, screenshot: e.target.files?.[0] || null })}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label htmlFor="screenshot-upload" className="cursor-pointer">
                    <i className="ri-image-add-line text-3xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-600">
                      {ticketForm.screenshot ? ticketForm.screenshot.name : 'Click to upload screenshot'}
                    </p>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmitTicket}
                className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className="ri-send-plane-line"></i>
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpSupportPage;
