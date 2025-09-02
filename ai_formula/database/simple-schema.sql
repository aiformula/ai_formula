-- Simple Payment System Database Schema
-- Just the essentials for PayMe and FPS payments
-- @author AI Formula Team
-- @version 1.0.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Simple Payment Records Table
-- This is all you really need!
CREATE TABLE IF NOT EXISTS public.payment_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_reference VARCHAR(20) NOT NULL UNIQUE, -- AI123456 format
    user_email VARCHAR(255), -- Optional: store user email if available
    course_id VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(10) NOT NULL CHECK (payment_method IN ('payme', 'fps')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    screenshot_received BOOLEAN DEFAULT false,
    whatsapp_notified BOOLEAN DEFAULT false,
    access_granted BOOLEAN DEFAULT false,
    notes TEXT, -- For admin notes about verification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE
);

-- Simple Course Access Table
-- Track who has access to what course
CREATE TABLE IF NOT EXISTS public.course_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- From Supabase auth.users
    course_id VARCHAR(100) NOT NULL,
    access_level VARCHAR(20) DEFAULT 'single' CHECK (access_level IN ('single', 'half-access', 'all-access')),
    payment_record_id UUID REFERENCES public.payment_records(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE, -- NULL = lifetime access
    UNIQUE(user_id, course_id, access_level)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_records_order_ref ON public.payment_records(order_reference);
CREATE INDEX IF NOT EXISTS idx_payment_records_status ON public.payment_records(status);
CREATE INDEX IF NOT EXISTS idx_course_access_user_course ON public.course_access(user_id, course_id);

-- Insert basic data (optional)
-- You can skip this if you want to keep it even simpler 