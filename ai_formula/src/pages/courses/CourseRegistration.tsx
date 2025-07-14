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
  MessageCircle, 
  Clock, 
  Star, 
  Award,
  CreditCard,
  Shield,
  Users,
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
  const courseTitle = location.state?.courseTitle || 'AI Ë™≤Á?';
  const coursePrice = location.state?.coursePrice || '$3,800';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    const message = `?ëÊÉ≥?±Â?${courseTitle}Ë™≤Á?ÔºåÂÉπ?ºÊòØ${coursePrice}?ÇË??èÂ?‰ΩïÈÄ≤Ë??±Â?Ôºü`;
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
                {isZhTW ? '?±Â??êÂ?Ôº? : 'Registration Successful!'}
              </h1>
              <p className="text-gray-300 mb-6">
                {isZhTW 
                  ? '?≠Â??®Â∑≤?êÂ??±Â?Ë™≤Á?ÔºÅÊ??ëÂ???4Â∞èÊ??ßÈÄèÈ??ªÈÉµ?ØÁµ°?®Ô??ê‰?Ë™≤Á?Ë©≥Á¥∞Ë≥áË??åÈ?Ë™≤Ê??ì„Ä?
                  : 'Congratulations! You have successfully registered for the course. We will contact you within 24 hours via email with detailed course information and schedule.'
                }
              </p>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  {isZhTW ? 'Ê≠?ú®Ë∑≥Ë??∞Ë™≤Á®ãÈ???..' : 'Redirecting to course page...'}
                </div>
                <Button onClick={() => navigate('/courses/free-plan')} className="w-full bg-green-600 hover:bg-green-700">
                  {isZhTW ? 'Á´ãÂç≥?ãÂ?Â≠∏Á?' : 'Start Learning Now'}
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
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhTW ? 'ËøîÂ?' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isZhTW ? 'Ë™≤Á??±Â?' : 'Course Registration'}
              </h1>
              <p className="text-gray-400 mt-2">
                {isZhTW ? 'Â°´ÂØ´‰ª•‰?‰ø°ÊÅØÂÆåÊ??±Â?' : 'Fill out the information below to complete registration'}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {isZhTW ? '?±Â?‰ø°ÊÅØ' : 'Registration Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      {isZhTW ? 'ÂßìÂ?' : 'Full Name'} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder={isZhTW ? 'Ë´ãËº∏?•ÊÇ®?ÑÂ??? : 'Enter your full name'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      {isZhTW ? '?ªÂ??µÁÆ±' : 'Email Address'} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder={isZhTW ? 'Ë´ãËº∏?•ÊÇ®?ÑÈõªÂ≠êÈÉµÁÆ? : 'Enter your email address'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">
                      {isZhTW ? '?ØÁµ°?ªË©±' : 'Phone Number'} *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder={isZhTW ? 'Ë´ãËº∏?•ÊÇ®?ÑËÅØÁµ°ÈõªË©? : 'Enter your phone number'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-white">
                      {isZhTW ? '?∏È?Á∂ìÈ?' : 'Relevant Experience'}
                    </Label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full mt-1 bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
                    >
                      <option value="">
                        {isZhTW ? 'Ë´ãÈÅ∏?áÊÇ®?ÑÁ?È©óÁ?Â∫? : 'Select your experience level'}
                      </option>
                      <option value="beginner">
                        {isZhTW ? '?ùÂ≠∏?? : 'Beginner'}
                      </option>
                      <option value="intermediate">
                        {isZhTW ? '‰∏≠Á?' : 'Intermediate'}
                      </option>
                      <option value="advanced">
                        {isZhTW ? 'È´òÁ?' : 'Advanced'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="goals" className="text-white">
                      {isZhTW ? 'Â≠∏Á??ÆÊ?' : 'Learning Goals'}
                    </Label>
                    <Textarea
                      id="goals"
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder={isZhTW ? 'Ë´ãÁ∞°?ÆÊ?Ëø∞ÊÇ®?ÑÂ≠∏ÁøíÁõÆÊ®ôÂ??üÊ?' : 'Please describe your learning goals and expectations'}
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
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {isZhTW ? '?ê‰∫§‰∏?..' : 'Submitting...'}
                        </div>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 mr-2" />
                          {isZhTW ? 'Á´ãÂç≥?±Â?' : 'Register Now'}
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleWhatsAppRegister}
                      className="flex-1 border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {isZhTW ? 'WhatsApp ?±Â?' : 'WhatsApp Register'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Course Summary */}
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {isZhTW ? 'Ë™≤Á??òË?' : 'Course Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-white mb-2">{courseTitle}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-yellow-600 text-white">
                          {isZhTW ? '?±È?Ë™≤Á?' : 'Popular Course'}
                        </Badge>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {isZhTW ? '?êÊ??™Ê?' : 'Limited Time Offer'}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-yellow-400 mb-4">
                        {coursePrice}
                        <span className="text-sm text-gray-400 ml-2 line-through">
                          $5,800
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {isZhTW ? '12 ?±Ë™≤Á®? : '12 Weeks Course'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {isZhTW ? '24 Â∞èÊ??ßÂÆπ' : '24 Hours Content'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {isZhTW ? '‰∏ÄÂ∞ç‰?Â∞éÂ∏´?áÂ?' : '1-on-1 Mentorship'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {isZhTW ? 'ÂÆåÊ?Ë≠âÊõ∏' : 'Certificate of Completion'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {isZhTW ? 'Ë™≤Á??πÂÄ? : 'Course Value'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {isZhTW ? 'Ê∞∏‰?ËßÄ?ãÊ??? : 'Lifetime Access'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {isZhTW ? 'Ë™≤Á?Ê∫ê‰ª£Á¢º‰?Ëº? : 'Source Code Download'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {isZhTW ? 'Â∞éÂ∏´?èÁ??ØÊè¥' : 'Instructor Q&A Support'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {isZhTW ? 'Â≠∏Á?Á§æÁæ§?†ÂÖ•' : 'Learning Community Access'}
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
                      {isZhTW ? 'ÂÆâÂÖ®‰ªòÊ¨æ ¬∑ 7Â§©ÈÄÄÊ¨æ‰?Ë≠? : 'Secure Payment ¬∑ 7-Day Money Back Guarantee'}
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
