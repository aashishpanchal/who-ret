export type JwtPayload = {
  type: string;
  sub: string;
  jti: string;
};

export type JwtPayloadWithRt = JwtPayload & { refresh: string };
