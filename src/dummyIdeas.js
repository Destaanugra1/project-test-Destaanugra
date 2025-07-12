// Generate 60 dummy ideas
const generateDummyIdeas = () => {
  const ideas = [];
  const titles = [
    'Kenali Tingkatan Influencers berdasarkan Jumlah Followers',
    'Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer',
    'Tips Sukses Kampanye Digital di Era Modern',
    'Cara Efektif Meningkatkan Engagement di Media Sosial',
    'Strategi Konten Kreatif untuk Brand Awareness',
    'Mengukur ROI dari Influencer Marketing',
    'Pentingnya Analisis Data dalam Kampanye Digital',
    'Cara Membuat Brief yang Efektif untuk Influencer',
    'Tren Digital Marketing 2025',
    'Kesalahan Umum dalam Influencer Marketing',
    'Strategi TikTok Marketing untuk Bisnis Kecil',
    'Mengelola Reputasi Brand di Media Sosial',
    'Kolaborasi Influencer dan Brand: Kunci Sukses',
    'Teknik Storytelling untuk Konten Marketing',
    'Optimasi SEO untuk Artikel Blog',
    'Strategi Email Marketing yang Efektif',
    'Pemanfaatan User Generated Content untuk Brand',
    'Tips Membuat Caption Instagram yang Menarik',
    'Integrasi Offline dan Online Marketing',
    'Menggunakan Data Analytics untuk Keputusan Marketing',
  ];

  for (let i = 1; i <= 60; i++) {
    // Select a title, cycling through them if needed
    const titleIndex = (i - 1) % titles.length;
    // Add a suffix to make each title unique if we're reusing them
    const titleSuffix =
      i <= titles.length ? '' : ` - Edisi ${Math.ceil(i / titles.length)}`;

    // Calculate date, going backwards from Sept 10, 2024
    const date = new Date(2024, 8, 10); // Sept 10, 2024
    date.setDate(date.getDate() - (i - 1));
    const formattedDate = date.toISOString().split('T')[0];

    ideas.push({
      id: i,
      title: titles[titleIndex] + titleSuffix,
      published_at: formattedDate,
      small_image: [
        {
          url: `https://source.unsplash.com/random/150x150/?marketing,digital,${i}`,
        },
      ],
      medium_image: [
        {
          url: `https://source.unsplash.com/random/200x200/?marketing,digital,${i}`,
        },
      ],
    });
  }

  return ideas;
};

const dummyIdeas = generateDummyIdeas();

export default dummyIdeas;
