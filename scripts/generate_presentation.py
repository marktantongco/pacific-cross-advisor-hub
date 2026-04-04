#!/usr/bin/env python3
"""
Pacific Cross Advisor Hub - Training Presentation Generator
Generates a comprehensive PDF presentation for insurance advisor training
"""

from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# Register fonts
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')

# Colors
BRUTALIST_BLACK = colors.HexColor('#0A0A0A')
BRUTALIST_WHITE = colors.HexColor('#FFFFFF')
ACCENT_PINK = colors.HexColor('#FF3366')
ACCENT_GREEN = colors.HexColor('#00D4AA')
ACCENT_YELLOW = colors.HexColor('#FFB800')

def create_presentation():
    doc = SimpleDocTemplate(
        "download/pacific_cross_training_deck.pdf",
        pagesize=landscape(A4),
        rightMargin=0.5*inch,
        leftMargin=0.5*inch,
        topMargin=0.5*inch,
        bottomMargin=0.5*inch,
        title="Pacific Cross Advisor Training Deck",
        author="Z.ai",
        creator="Z.ai"
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'BrutalistTitle',
        fontName='Times New Roman',
        fontSize=36,
        leading=42,
        alignment=TA_CENTER,
        textColor=BRUTALIST_BLACK,
        spaceAfter=24
    )
    
    subtitle_style = ParagraphStyle(
        'BrutalistSubtitle',
        fontName='Times New Roman',
        fontSize=18,
        leading=24,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#525252'),
        spaceAfter=36
    )
    
    heading_style = ParagraphStyle(
        'BrutalistHeading',
        fontName='Times New Roman',
        fontSize=28,
        leading=34,
        alignment=TA_LEFT,
        textColor=BRUTALIST_BLACK,
        spaceAfter=18,
        spaceBefore=12
    )
    
    body_style = ParagraphStyle(
        'BrutalistBody',
        fontName='Times New Roman',
        fontSize=14,
        leading=20,
        alignment=TA_LEFT,
        textColor=BRUTALIST_BLACK,
        spaceAfter=12
    )
    
    story = []
    
    # Slide 1: Title
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("PACIFIC CROSS", title_style))
    story.append(Paragraph("ADVISOR TRAINING DECK", title_style))
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph("Your Journey as a Trusted Insurance Advisor Starts Now", subtitle_style))
    story.append(Spacer(1, 1*inch))
    story.append(Paragraph("Products: Blue Royale | FlexiShield", body_style))
    story.append(PageBreak())
    
    # Slide 2: Why Insurance Matters
    story.append(Paragraph("WHY INSURANCE MATTERS", heading_style))
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("Insurance is not just a product — it's a financial safety net that protects everything you've worked for.", body_style))
    story.append(Spacer(1, 0.25*inch))
    
    why_data = [
        ['Key Concept', 'Description'],
        ['Risk Transfer', 'Move financial risk from individual to insurer'],
        ['Peace of Mind', 'Know you\'re protected when the unexpected happens'],
        ['Family Protection', 'Ensure your loved ones are financially secure'],
        ['Asset Preservation', 'Protect your savings from medical emergencies'],
    ]
    
    why_table = Table(why_data, colWidths=[2.5*inch, 6*inch])
    why_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BRUTALIST_BLACK),
        ('TEXTCOLOR', (0, 0), (-1, 0), BRUTALIST_WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Times New Roman'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('FONTNAME', (0, 1), (-1, -1), 'Times New Roman'),
        ('FONTSIZE', (0, 1), (-1, -1), 12),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 2, BRUTALIST_BLACK),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(why_table)
    story.append(PageBreak())
    
    # Slide 3: Philippine Insurance Landscape
    story.append(Paragraph("THE PHILIPPINE INSURANCE LANDSCAPE", heading_style))
    story.append(Spacer(1, 0.25*inch))
    
    stats_data = [
        ['Statistic', 'Value', 'What It Means'],
        ['Insurance Penetration', '1.78%', 'One of the lowest in Southeast Asia'],
        ['Filipinos with Insurance', '~15%', '85% of population unprotected'],
        ['Life Insurance Premiums', 'P403 Billion', 'Record high in 2025'],
        ['Average HMO Coverage', 'P150,000', 'Often insufficient for major illness'],
        ['Cancer Treatment Cost', 'P1-2 Million', 'Can wipe out a family\'s savings'],
    ]
    
    stats_table = Table(stats_data, colWidths=[2.5*inch, 2*inch, 4*inch])
    stats_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BRUTALIST_BLACK),
        ('TEXTCOLOR', (0, 0), (-1, 0), BRUTALIST_WHITE),
        ('FONTNAME', (0, 0), (-1, -1), 'Times New Roman'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('FONTSIZE', (0, 1), (-1, -1), 12),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 2, BRUTALIST_BLACK),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(stats_table)
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph("THE OPPORTUNITY: Huge untapped market with growing middle class and increasing health awareness.", body_style))
    story.append(PageBreak())
    
    # Slide 4: Blue Royale
    story.append(Paragraph("BLUE ROYALE — Premium Global Health Coverage", heading_style))
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("The ultimate international health insurance plan offering comprehensive medical coverage worldwide.", body_style))
    story.append(Spacer(1, 0.25*inch))
    
    blue_data = [
        ['Feature', 'Details'],
        ['Coverage Limit', 'Up to USD 2,000,000 annually'],
        ['Network', 'Any hospital worldwide — no restrictions'],
        ['Direct Billing', 'Available at accredited facilities'],
        ['Travel Insurance', 'Included for trips up to 90 days'],
        ['Maternity', 'Available as add-on'],
        ['Ideal For', 'Executives, Frequent Travelers, Expats, OFW Families'],
        ['Starting Price', 'From $3,500/year'],
    ]
    
    blue_table = Table(blue_data, colWidths=[2.5*inch, 6*inch])
    blue_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT_PINK),
        ('TEXTCOLOR', (0, 0), (-1, 0), BRUTALIST_WHITE),
        ('FONTNAME', (0, 0), (-1, -1), 'Times New Roman'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('FONTSIZE', (0, 1), (-1, -1), 12),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 2, BRUTALIST_BLACK),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(blue_table)
    story.append(PageBreak())
    
    # Slide 5: FlexiShield
    story.append(Paragraph("FLEXISHIELD — Your Affordable Top-Up Protection", heading_style))
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("A second-layer medical insurance that enhances your existing HMO coverage.", body_style))
    story.append(Spacer(1, 0.25*inch))
    
    flexi_data = [
        ['Feature', 'Details'],
        ['Coverage Limit', 'Up to PHP 2,000,000 per illness'],
        ['Requirement', 'Existing HMO with minimum P150,000'],
        ['COVID-19', 'Included in coverage'],
        ['Claims', 'Reimbursement basis'],
        ['Pre-existing Conditions', 'No exclusion for Plan A'],
        ['Ideal For', 'Employees with HMO, Young Professionals, Budget-Conscious Families'],
        ['Starting Price', 'From P15,000/year'],
    ]
    
    flexi_table = Table(flexi_data, colWidths=[2.5*inch, 6*inch])
    flexi_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT_GREEN),
        ('TEXTCOLOR', (0, 0), (-1, 0), BRUTALIST_WHITE),
        ('FONTNAME', (0, 0), (-1, -1), 'Times New Roman'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('FONTSIZE', (0, 1), (-1, -1), 12),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 2, BRUTALIST_BLACK),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(flexi_table)
    story.append(PageBreak())
    
    # Slide 6: Product Comparison
    story.append(Paragraph("PRODUCT COMPARISON", heading_style))
    story.append(Spacer(1, 0.25*inch))
    
    compare_data = [
        ['Feature', 'Blue Royale', 'FlexiShield'],
        ['Coverage', 'Up to $2M', 'Up to P2M'],
        ['Currency', 'USD', 'PHP'],
        ['Network', 'Worldwide', 'Philippines only'],
        ['Requires HMO', 'No', 'Yes (min P150K)'],
        ['Direct Billing', 'Yes', 'No (reimbursement)'],
        ['Best For', 'Executives, Travelers', 'Employees, Families'],
        ['Starting Price', '~$3,500/year', '~P15,000/year'],
    ]
    
    compare_table = Table(compare_data, colWidths=[3*inch, 2.75*inch, 2.75*inch])
    compare_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BRUTALIST_BLACK),
        ('TEXTCOLOR', (0, 0), (-1, 0), BRUTALIST_WHITE),
        ('FONTNAME', (0, 0), (-1, -1), 'Times New Roman'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('FONTSIZE', (0, 1), (-1, -1), 12),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 2, BRUTALIST_BLACK),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(compare_table)
    story.append(PageBreak())
    
    # Slide 7: Common Misconceptions
    story.append(Paragraph("MYTH BUSTERS", heading_style))
    story.append(Spacer(1, 0.25*inch))
    
    myth_data = [
        ['MYTH', 'REALITY'],
        ['"I\'m young and healthy, I don\'t need insurance"', 'Best time to buy — lower premiums, better coverage'],
        ['"My HMO from work is enough"', 'Most HMOs cap at P300K — serious illness costs millions'],
        ['"Insurance is a waste of money"', 'It\'s buying peace of mind and protecting your savings'],
        ['"I\'ll get it when I\'m older"', 'Premiums increase with age; conditions may make you uninsurable'],
    ]
    
    myth_table = Table(myth_data, colWidths=[4.5*inch, 4.5*inch])
    myth_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), colors.HexColor('#DC2626')),
        ('BACKGROUND', (1, 0), (1, 0), ACCENT_GREEN),
        ('TEXTCOLOR', (0, 0), (-1, 0), BRUTALIST_WHITE),
        ('FONTNAME', (0, 0), (-1, -1), 'Times New Roman'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('FONTSIZE', (0, 1), (-1, -1), 11),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 2, BRUTALIST_BLACK),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(myth_table)
    story.append(PageBreak())
    
    # Slide 8: The Advisor's Role
    story.append(Paragraph("THE ADVISOR'S ROLE", heading_style))
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("Be a Guide, Not a Salesperson", subtitle_style))
    story.append(Spacer(1, 0.25*inch))
    
    advisor_data = [
        ['Principle', 'Action'],
        ['Listen First', 'Understand their needs before offering solutions'],
        ['Educate', 'Share knowledge, don\'t just sell products'],
        ['Be Honest', 'Share limitations too — build trust'],
        ['Follow Up', 'Build long-term relationships'],
        ['Care Genuinely', 'It\'s about protection, not commission'],
    ]
    
    advisor_table = Table(advisor_data, colWidths=[3*inch, 5.5*inch])
    advisor_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT_YELLOW),
        ('TEXTCOLOR', (0, 0), (-1, 0), BRUTALIST_BLACK),
        ('FONTNAME', (0, 0), (-1, -1), 'Times New Roman'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('FONTSIZE', (0, 1), (-1, -1), 12),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 2, BRUTALIST_BLACK),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(advisor_table)
    story.append(PageBreak())
    
    # Slide 9: The OFW Opportunity
    story.append(Paragraph("THE OFW OPPORTUNITY", heading_style))
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("Protecting Families Across Borders", subtitle_style))
    story.append(Spacer(1, 0.25*inch))
    
    story.append(Paragraph("Why OFW Families Need Insurance:", body_style))
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph("• OFWs work hard overseas to provide a better life for their families", body_style))
    story.append(Paragraph("• Medical emergencies can create debt that wipes out years of savings", body_style))
    story.append(Paragraph("• Distance makes care coordination difficult", body_style))
    story.append(Paragraph("• Insurance = A gift of love to themselves and their families", body_style))
    story.append(Spacer(1, 0.25*inch))
    
    story.append(Paragraph("Talking Points:", body_style))
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph('• "Your family member works hard abroad to give you a better life"', body_style))
    story.append(Paragraph('• "Protect what they\'re building — don\'t let illness wipe out their sacrifice"', body_style))
    story.append(Paragraph('• "Give them peace of mind knowing you\'re protected"', body_style))
    story.append(PageBreak())
    
    # Slide 10: Closing
    story.append(Spacer(1, 1.5*inch))
    story.append(Paragraph("REMEMBER", title_style))
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph('"Insurance is the only product that you buy hoping you\'ll never need to use it.', subtitle_style))
    story.append(Paragraph('But if you do need it, you\'ll be glad you have it."', subtitle_style))
    story.append(Spacer(1, 1*inch))
    
    story.append(Paragraph("ACTION ITEMS:", heading_style))
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("1. Know your products inside and out", body_style))
    story.append(Paragraph("2. Build your network consistently", body_style))
    story.append(Paragraph("3. Educate, don't sell", body_style))
    story.append(Paragraph("4. Follow up religiously", body_style))
    story.append(Paragraph("5. Protect families — that's the mission", body_style))
    
    doc.build(story)
    print("Presentation generated: download/pacific_cross_training_deck.pdf")

if __name__ == '__main__':
    create_presentation()
