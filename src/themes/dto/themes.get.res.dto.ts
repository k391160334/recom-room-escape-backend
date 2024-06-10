// TODO: swagger 설정
export class GetThemesResponseDto {
  recommendation_score: number;

  theme_name: string;

  creation_date: number;

  review_count: number;

  difficulty_score: number;

  horror_score: number;

  duration: number;

  theme_poster_img_url: string;

  cafe_name: string;

  cafe_longitude: number;

  cafe_latitude: number;

  start_time: number;

  reservation_done: boolean;
}
