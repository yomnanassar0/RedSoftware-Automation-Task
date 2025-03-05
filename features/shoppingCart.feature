@shopping-cart
Feature: Shopping Cart

    Background:
        Given the user is on the homepage

    @add-to-cart
    Scenario: Add a Product to Cart
        When the user clicks on a category "Gear"
        And the user clicks on a subcategory "Bags"
        And the user clicks on "Endeavor Daytrip Backpack" product
        When the user clicks Add to Cart
        Then the product should be added to the cart is displayed

    @update-cart
    Scenario: Update Cart Quantity
        When the user clicks on a category "Gear"
        And the user clicks on a subcategory "Bags"
        And the user clicks on "Endeavor Daytrip Backpack" product
        When the user clicks Add to Cart
        And the user clicks on cart
        And the user updates the quantity of the product to "3"
        Then the total price should update accordingly

    @remove-cart
    Scenario: Remove Product from Cart
        When the user clicks on a category "Gear"
        And the user clicks on a subcategory "Bags"
        And the user clicks on "Endeavor Daytrip Backpack" product
        When the user clicks Add to Cart
        And the user clicks on cart
        When the user removes item from cart
        Then the product should be removed