import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Award,
  MessageCircle,
  Shield,
  BookOpen
} from 'lucide-react';

const CourseRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
    paymentMethod: 'credit-card'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get course info from URL params or location state
  const courseTitle = location.state?.courseTitle || 'AI 課程';
  const coursePrice = location.state?.coursePrice || '$3,800';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to course dashboard page after successful registration
      setTimeout(() => {
        navigate('/courses/dashboard');
      }, 2000);
    }, 2000);
  };

  const handleWhatsAppRegister = () => {
    const message = `我想報名參加 ${courseTitle} 課程`;
    window.open(`https://wa.me/85298765432?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8 pt-24">
          <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                {isZhTW ? '註冊成功！' : 'Registration Successful!'}
              </h1>
              <p className="text-gray-300 mb-6">
                {isZhTW 
                  ? '恭喜你已成功註冊課程！我們將在24小時內透過電子郵件聯絡你，提供課程詳細資訊及課程時間表。'
                  : 'Congratulations! You have successfully registered for the course. We will contact you within 24 hours via email with detailed course information and schedule.'
                }
              </p>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  {isZhTW ? '正在跳轉至課程頁面...' : 'Redirecting to course page...'}
                </div>
                <Button 
                  onClick={() => navigate('/courses/free-plan')} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isZhTW ? '立即開始學習' : 'Start Learning Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhTW ? '返回' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isZhTW ? '課程註冊' : 'Course Registration'}
              </h1>
              <p className="text-gray-400 mt-2">
                {isZhTW ? '填寫以下信息完成註冊' : 'Fill out the information below to complete registration'}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {isZhTW ? '註冊資訊' : 'Registration Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      {isZhTW ? '姓名' : 'Full Name'}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder={isZhTW ? '請輸入您的姓名' : 'Enter your full name'}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      {isZhTW ? '電子郵件' : 'Email Address'}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder={isZhTW ? '請輸入您的電子郵件' : 'Enter your email address'}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">
                      {isZhTW ? '電話號碼' : 'Phone Number'}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder={isZhTW ? '請輸入您的電話號碼' : 'Enter your phone number'}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-white">
                      {isZhTW ? '相關經驗' : 'Relevant Experience'}
                    </Label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full mt-1 bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
                      required
                    >
                      <option value="">
                        {isZhTW ? '請選擇您的經驗水平' : 'Select your experience level'}
                      </option>
                      <option value="beginner">
                        {isZhTW ? '初學者' : 'Beginner'}
                      </option>
                      <option value="intermediate">
                        {isZhTW ? '中級' : 'Intermediate'}
                      </option>
                      <option value="advanced">
                        {isZhTW ? '高級' : 'Advanced'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="goals" className="text-white">
                      {isZhTW ? '學習目標' : 'Learning Goals'}
                    </Label>
                    <Textarea
                      id="goals"
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder={isZhTW ? '請簡述您的學習目標和期望' : 'Please describe your learning goals and expectations'}
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {isZhTW ? '註冊中...' : 'Submitting...'}
                        </div>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 mr-2" />
                          {isZhTW ? '立即註冊' : 'Register Now'}
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button"
                      onClick={handleWhatsAppRegister}
                      variant="outline"
                      className="flex-1 border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {isZhTW ? 'WhatsApp 註冊' : 'WhatsApp Register'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {isZhTW ? '課程概要' : 'Course Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-white mb-2">{courseTitle}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-blue-600">
                          {isZhTW ? '熱門課程' : 'Popular Course'}
                        </Badge>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {isZhTW ? '限時優惠' : 'Limited Time Offer'}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-yellow-400 mb-4">
                        {coursePrice}
                        <span className="text-sm text-gray-400 ml-2 line-through">
                          {isZhTW ? '原價 $4,800' : 'Original $4,800'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {isZhTW ? '12 週課程' : '12 Weeks Course'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {isZhTW ? '24 小時內容' : '24 Hours Content'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {isZhTW ? '一對一指導' : '1-on-1 Mentorship'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {isZhTW ? '完成證書' : 'Certificate of Completion'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {isZhTW ? '課程價值' : 'Course Value'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {isZhTW ? '永久存取權限' : 'Lifetime Access'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {isZhTW ? '課程原始碼下載' : 'Source Code Download'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {isZhTW ? '導師問答支援' : 'Instructor Q&A Support'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {isZhTW ? '學習社群存取' : 'Learning Community Access'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>
                      {isZhTW ? '安全付款 · 7天退款保證' : 'Secure Payment · 7-Day Money Back Guarantee'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
