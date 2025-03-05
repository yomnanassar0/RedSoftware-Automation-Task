@product-catalog
Feature: Product Catalog

    Background: 
        Given the user is on the homepage

    @view-categories
    Scenario: View Product Categories
        When the user clicks on a category "Women"
        Then the subcategories should be displayed correctly

    @view-details
    Scenario: View Product Details
        When the user clicks on a category "Women"
        And the user clicks on a subcategory "Tops"
        And the user clicks on "Breathe-Easy Tank" product
        Then the product details should be displayed
    
    @sort-product
    Scenario: Sort Products by Price (Low to High)
        When the user clicks on a category "Women"
        And the user clicks on a subcategory "Tops"
        And the user sorts products by "Price" 
        Then the products should be displayed in correct order