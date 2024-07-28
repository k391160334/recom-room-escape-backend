// TODO: swagger 설정
export type GetCafeLocationsResponseDto = {
  name: string;
  children: { name: string; id: number }[];
}[];
