import { User, Pick, Winner } from '@prisma/client'
import { CategoryPoints } from '@am-oscar-2023/shared'

export function makeWinnerMap (winners: Winner[]): Record<string, string> {
  return winners.reduce((acc, winner) => {
    acc[winner.category] = winner.nominee
    return acc
  }, {} as Record<string, string>)
}

export function userScore(user: User & { picks: Pick[] }, winnerMap: Record<string, string>): number {
  let score = 0

  for (const pick of user.picks) {
    const winningNominee = winnerMap[pick.category]
    if (!winningNominee) continue
    if (winningNominee === pick.nominee) {
      const points = CategoryPoints[pick.category]
      score += points
    }
  }

  return score
}
