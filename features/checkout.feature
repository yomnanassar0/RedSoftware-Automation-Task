@checkout
Feature: Checkout Process

    Background:
        Given the user is on the homepage
        When the user clicks on a category "Gear"
        And the user clicks on a subcategory "Bags"
        And the user clicks on "Endeavor Daytrip Backpack" product
        When the user clicks Add to Cart
        And the user clicks on cart

    @valid-checkout
    Scenario: Successful Checkout with Valid Payment
        When the user enters valid shipping and payment details
        And clicks Place Order
        Then the order should be successfully placed

    @empty-checkout
    Scenario: Validation for Empty Checkout Form
        When the user proceeds to checkout without filling the form
        And the user cannot be redirected to payment page