
-- Create enum for contact submission status
CREATE TYPE contact_status AS ENUM ('NEW', 'READ', 'ARCHIVED');

-- Programs table
CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    full_description TEXT NOT NULL,
    target_audience TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT,
    image_url TEXT NOT NULL,
    specialties TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name TEXT NOT NULL,
    course_taken_id UUID REFERENCES programs(id) ON DELETE SET NULL,
    quote TEXT NOT NULL,
    student_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status contact_status DEFAULT 'NEW',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_programs_slug ON programs(slug);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Programs are viewable by everyone" ON programs FOR SELECT USING (true);
CREATE POLICY "Teachers are viewable by everyone" ON teachers FOR SELECT USING (true);
CREATE POLICY "Articles are viewable by everyone" ON articles FOR SELECT USING (true);
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials FOR SELECT USING (true);

-- Admin policies (you'll need to implement user roles)
CREATE POLICY "Admins can manage programs" ON programs FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can manage teachers" ON teachers FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can manage articles" ON articles FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can view contact submissions" ON contact_submissions FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can update contact submissions" ON contact_submissions FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Public can insert contact submissions
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
