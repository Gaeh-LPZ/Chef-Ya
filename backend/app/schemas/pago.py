from __future__ import annotations

from pydantic import BaseModel, Field


class PagoSimuladoRequest(BaseModel):
    carritoId: str = Field(..., description="ID del carrito a pagar (ObjectId en string)")


class PagoStripeCheckoutRequest(BaseModel):
    carritoId: str = Field(..., description="ID del carrito a pagar (ObjectId en string)")
    successUrl: str = Field(
        ...,
        description=(
            "URL a la que Stripe redirigirá cuando el pago sea exitoso. "
            "Puedes incluir placeholders como {CHECKOUT_SESSION_ID}."
        ),
    )
    cancelUrl: str = Field(
        ...,
        description="URL a la que Stripe redirigirá si el usuario cancela el pago.",
    )


class PagoStripeCheckoutResponse(BaseModel):
    checkoutUrl: str = Field(..., description="URL de Stripe Checkout para redirigir al usuario")
