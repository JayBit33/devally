// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const hiring_options = ['Shares', 'Flat Rate'];
const regions = ['US','South America','Africa','Asia','Europe'];

module.exports = [
  {
    creator_id: 1,
    team_member_ids: JSON.stringify([2,4,6]),
    name: 'StrayCat Saver',
    category: 'Website',
    description: 'Helps find homes for stray cats',
    hiring_options: JSON.stringify([...hiring_options]),
    viewable_regions: JSON.stringify([regions[0],regions[4]])
  }
]
