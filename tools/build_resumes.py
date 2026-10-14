"""Rebuild bilingual draft resume PDFs. Requires pip install reportlab.
Review and update details/links before you send the PDFs to employers.
"""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import simpleSplit
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4

BASE = Path(__file__).resolve().parent.parent
OUT = BASE / 'resume'
OUT.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('DejaVu', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuBold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('DejaVu', normal='DejaVu', bold='DejaVuBold', italic='DejaVu')
NAVY = colors.HexColor('#0a192f')
MINT_DARK = colors.HexColor('#008f79')
SLATE = colors.HexColor('#53677e')

CONTENT = {
'en': {
 'name':'LE DOAN ANH TUAN', 'role':'SOFTWARE ENGINEERING STUDENT',
 'location':'Ho Chi Minh City, Vietnam', 'email':'tamcaungu404@gmail.com',
 'profile':'Final-year Software Engineering student interested in AI applications, backend engineering, C++, systems programming and GPU computing. Enjoys shipping practical projects and developing a strong technical foundation.',
 'sections': [
  ('EDUCATION', [('Nguyen Tat Thanh University', 'Software Engineering · Final year', 'Ho Chi Minh City')]),
  ('TECHNICAL SKILLS', [('Languages', 'Python, C/C++, JavaScript, HTML, CSS', ''), ('Frameworks & AI', 'FastAPI, TensorFlow / Keras, Vite, Capacitor', ''), ('Tools & Platforms', 'Git, Docker, Linux, SQLite, Android tooling', ''), ('Currently Learning', 'CUDA, parallel computing, GPU performance optimization', '')]),
  ('SELECTED PROJECTS', [
    ('Lung X-ray AI', 'AI-assisted chest X-ray classifier (normal, pneumonia, tuberculosis). MobileNetV2 model v1.1: 89.62% test accuracy on a curated test set. Built prediction endpoints, portable packaging and SQLite-based analysis history. v2 ongoing.', 'Python · TensorFlow · FastAPI · SQLite · Docker'),
    ('CUDA Matrix Multiplication Optimizer (In Progress)', 'Implemented and verified the C++ CPU matrix-multiplication baseline. Learning and planning CUDA kernels, tiling, shared memory, profiling, and fair CPU/GPU comparisons; GPU implementation not yet completed.', 'C++ · Linux · CUDA learning'),
    ('VocaMini Vocabulary App', 'Built a lightweight English vocabulary web application and tested Android APK packaging with Capacitor.', 'JavaScript · Vite · Capacitor')
  ]),
  ('EXPERIENCE', [('GAA / MQA Roles', 'Approximately 8 months of work experience; ended August 2026. Role-specific responsibilities should be confirmed before job applications.', '')]),
 ],
 'note': 'Portfolio-inspired resume draft — please verify factual details and add public project/profile links before distribution.'
},
'vi': {
 'name':'LÊ ĐOÀN ANH TUẤN', 'role':'SINH VIÊN KỸ THUẬT PHẦN MỀM',
 'location':'TP. Hồ Chí Minh, Việt Nam', 'email':'tamcaungu404@gmail.com',
 'profile':'Sinh viên năm cuối ngành Kỹ thuật phần mềm, quan tâm đến ứng dụng AI, phát triển backend, C++, lập trình hệ thống và tính toán GPU. Yêu thích việc xây dựng sản phẩm thực tế và củng cố nền tảng kỹ thuật.',
 'sections': [
  ('HỌC VẤN', [('Đại học Nguyễn Tất Thành', 'Ngành Kỹ thuật phần mềm · Sinh viên năm cuối', 'TP. Hồ Chí Minh')]),
  ('KỸ NĂNG KỸ THUẬT', [('Ngôn ngữ', 'Python, C/C++, JavaScript, HTML, CSS', ''), ('Framework & AI', 'FastAPI, TensorFlow / Keras, Vite, Capacitor', ''), ('Công cụ & Nền tảng', 'Git, Docker, Linux, SQLite, công cụ Android', ''), ('Đang học', 'CUDA, tính toán song song, tối ưu hiệu năng GPU', '')]),
  ('DỰ ÁN TIÊU BIỂU', [
    ('Lung X-ray AI', 'Hệ thống phân loại ảnh X-quang phổi (bình thường, viêm phổi, lao phổi) hỗ trợ AI. MobileNetV2 v1.1 đạt 89,62% accuracy trên tập kiểm thử đã chuẩn bị. Xây dựng API dự đoán, bản đóng gói portable và lịch sử phân tích bằng SQLite. v2 đang phát triển.', 'Python · TensorFlow · FastAPI · SQLite · Docker'),
    ('CUDA Matrix Multiplication Optimizer (Đang thực hiện)', 'Đã xây dựng và kiểm tra phần nhân ma trận CPU bằng C++. Đang học và lên kế hoạch thử nghiệm CUDA kernel, tiling, shared memory, profiling và so sánh hiệu năng CPU/GPU; phần GPU chưa hoàn thành.', 'C++ · Linux · CUDA (đang học)'),
    ('Ứng dụng từ vựng VocaMini', 'Xây dựng ứng dụng web học từ vựng tiếng Anh và thử nghiệm đóng gói APK Android qua Capacitor.', 'JavaScript · Vite · Capacitor')
  ]),
  ('KINH NGHIỆM', [('Vai trò GAA / MQA', 'Khoảng 8 tháng kinh nghiệm làm việc; kết thúc tháng 08/2026. Cần xác minh mô tả nhiệm vụ cụ thể trước khi ứng tuyển.', '')]),
 ],
 'note': 'Bản hồ sơ nháp cho portfolio — vui lòng kiểm tra các chi tiết và bổ sung liên kết dự án/trang cá nhân trước khi gửi.'
}
}

def para(text, style):
    from xml.sax.saxutils import escape
    return Paragraph(escape(text), style)

def build(lang):
    data=CONTENT[lang]
    path=OUT / f'Le_Doan_Anh_Tuan_Resume_{lang.upper()}.pdf'
    doc=SimpleDocTemplate(str(path),pagesize=A4,rightMargin=39,leftMargin=39,topMargin=38,bottomMargin=34,title=f"Le Doan Anh Tuan - Resume ({lang.upper()})",author='Le Doan Anh Tuan')
    styles = {
        'name': ParagraphStyle('name',fontName='DejaVuBold',fontSize=19,leading=24,textColor=NAVY,spaceAfter=3),
        'role': ParagraphStyle('role',fontName='DejaVu',fontSize=9,leading=15,textColor=MINT_DARK,spaceAfter=5),
        'meta': ParagraphStyle('meta',fontName='DejaVu',fontSize=8.3,leading=15,textColor=SLATE),
        'heading': ParagraphStyle('heading',fontName='DejaVuBold',fontSize=9.2,leading=15,textColor=MINT_DARK,spaceBefore=14,spaceAfter=5),
        'entry': ParagraphStyle('entry',fontName='DejaVuBold',fontSize=9,leading=15,textColor=NAVY,spaceBefore=5,spaceAfter=1),
        'body': ParagraphStyle('body',fontName='DejaVu',fontSize=8.1,leading=13.5,textColor=SLATE,spaceAfter=3),
        'sub': ParagraphStyle('sub',fontName='DejaVu',fontSize=7.6,leading=13,textColor=MINT_DARK,spaceAfter=4),
        'foot': ParagraphStyle('foot',fontName='DejaVu',fontSize=6.4,leading=11,textColor=colors.HexColor('#7d8e9f'),spaceBefore=10)
    }
    story=[para(data['name'],styles['name']),para(data['role'],styles['role']),para(f"{data['location']}   |   {data['email']}",styles['meta']),Spacer(1,10),HRFlowable(width='100%',thickness=1,color=colors.HexColor('#d6e3e6')),Spacer(1,8),para(data['profile'],styles['body'])]
    for section, items in data['sections']:
        story.append(para(section, styles['heading']))
        story.append(HRFlowable(width='100%',thickness=.55,color=colors.HexColor('#d7e1e9'),spaceAfter=5))
        for title, description, tech in items:
            block=[para(title,styles['entry']),para(description,styles['body'])]
            if tech: block.append(para(tech,styles['sub']))
            story.append(KeepTogether(block))
    story.append(para(data['note'],styles['foot']))
    doc.build(story)
    print(path)

if __name__ == '__main__':
    for code in ('en','vi'): build(code)
