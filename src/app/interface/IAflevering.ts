export interface IAflevering {
  id: string;
  aflevering: number;
  laatsteAflevering: boolean;
  uitgezonden: boolean;
  hasTest?: boolean;
  hasVoorspelling?: boolean;
  deadlineDatetime: string;
}
